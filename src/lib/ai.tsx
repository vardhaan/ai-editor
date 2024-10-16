import { LLMChat, ModelTypes } from "./llmChat"




export const getAITextReplacement = async (currText: string) => {
    console.log(currText)
    const newText = await LLMChat({
        prompt: `Replace ${currText} with something Drake would say. Nothing else.`,
        priorMessages: [],
        params: {
            stream: false,
            model: ModelTypes.GPT_4o_Mini
        }
    })
    return newText
}