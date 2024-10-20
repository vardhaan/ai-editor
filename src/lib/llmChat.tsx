import OpenAI from "openai";
import { Stream } from "openai/streaming";
import ollama from 'ollama/browser'


export enum ModelTypes {
    GPT_4o = "gpt-4o",
    GPT_4 = "GPT-4",
    GPT_4o_Mini = "gpt-4o-mini",
    Claude_3_5_Sonnet = "claude-3-5-sonnet-20240620",
    Llama_3_8b = "llama3.1"
}

enum OpenAIModelTypes {
    GPT_4o = "gpt-4o",
    GPT_4 = "GPT-4",
    GPT_4o_Mini = "gpt-4o-mini",
}

enum OllamaModelTypes {
    Llama_3_8b = "llama3.1"
}

interface QueryResponsePair {
    query: string;
    response: string;
    model?: ModelTypes;
    temperature?: number;
    maxResponseLength?: number;
}

export interface LLMChatParams {
    model?: ModelTypes,
    temperature?: number,
    maxResponseLength?: number,
    stream?: boolean
}

const DEFAULT_PARAMS = {
    model: ModelTypes.Llama_3_8b,
    temperature: 1,
    maxResponseLength: 2000,
    stream: true
}

interface LLMChatProps {
    prompt: string;
    priorMessages: QueryResponsePair[],
    params?: LLMChatParams
}

const isOpenAIModel = (model: ModelTypes) => {
    return Object.values(OpenAIModelTypes).includes(model as unknown as OpenAIModelTypes)
}

const isOllamaModel = (model: ModelTypes) => {
    return Object.values(OllamaModelTypes).includes(model as unknown as OllamaModelTypes)
}

export const LLMChat = async function*(props: LLMChatProps) {
    const { prompt, priorMessages, params } = props
    const setParams = { ...DEFAULT_PARAMS, ...params }

    const chatProps = {
        prompt: prompt,
        priorMessages: priorMessages,
        ...setParams
    }

    console.log("chat props:", chatProps)
    if (isOpenAIModel(chatProps.model)) {
        const openAIChat = OpenAIChat(chatProps)
        for await (const token of openAIChat) {
            yield token;
        }
    }
    if (isOllamaModel(chatProps.model)) {
        const ollamaChat = OllamaChat(chatProps)
        for await (const token of ollamaChat) {
            yield token;
        }
    }
}

interface OpenAIChatProps {
    prompt: string;
    priorMessages: QueryResponsePair[];
    model: ModelTypes,
    temperature: number,
    maxResponseLength: number;
    stream: boolean;
}

const OpenAIChat = async function* (props: OpenAIChatProps) {
    console.log(import.meta.env.VITE_REACT_APP_OPENAI_API_KEY)

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    })

    const messageArray: {role: string, content: string}[] = []
    props.priorMessages.forEach(pair => {
        const user = { role: "user", content: pair.query }
        const assistant = { role: "assistant", content: pair.response }
        messageArray.push(user, assistant)
    })

    messageArray.push({ "role": "user", content: props.prompt })
    const oaiResponse = await openai.chat.completions.create({
        model: props.model,
        messages: messageArray as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        temperature: props.temperature,
        max_tokens: props.maxResponseLength,
        stream: props.stream
    }) 
    if (props.stream) {
        for await (const chunk of oaiResponse as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
            yield chunk.choices[0]?.delta?.content || '';
        }
    } else {
        const response = oaiResponse as OpenAI.Chat.Completions.ChatCompletion;
        yield response.choices[0].message.content;
    }
}

interface OllamaChatProps {
    prompt: string;
    priorMessages: QueryResponsePair[];
    model: ModelTypes,
    temperature: number,
    maxResponseLength: number;
    stream: boolean;
}

const OllamaChat = async function* (props: OllamaChatProps) {
    const messageArray: {role: string, content: string}[] = []
    props.priorMessages.forEach(pair => {
        const user = { "role": "user", "content": pair.query }
        const response = { "role": "assistant", "content": pair.response }
        messageArray.push(user, response)
    })
    messageArray.push({ "role": "user", content: props.prompt })
    if (props.stream) {
        console.log("llama!")
        const response = await ollama.chat({ model: props.model, messages: messageArray, stream: true })
        for await (const chunk of response) {
            console.log(chunk)
            yield chunk.message.content;
        }
    } else {
        const response = await ollama.chat({ model: props.model, messages: messageArray, stream: false })
        yield response.message.content;
    }
}