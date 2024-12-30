import { EditorState } from "@tiptap/pm/state"
import { AIEditData } from "../types/aiedit"
import { generateFileID, saveAIEditToDb } from "./io"
import { LLMChat, ModelTypes } from "./llmChat"
import { getSelectedText, PositionedSentence } from "./text"
import { AIEdit } from "../editor-extensions/AIEdit"
import { Editor } from "@tiptap/react"




export const getAITextReplacement = async (currText: string) => {
    console.log(currText)
    const newText = await LLMChat({
        prompt: `Replace "${currText}" with a cleaner, better alternative.`,
        priorMessages: [],
        params: {
            stream: false,
            model: ModelTypes.Llama_3_8b
        }
    })
    return newText
}


export const getAIEditLLMCall = async(currText: string) => {
    // const edit = await getAITextReplacement(currText)
    // let editContent = ""
    // for await (const value of edit) {
    //     if (value !== null) {
    //         editContent += value
    //     }
    // }
    const data = {
        id: generateFileID(),
        editContent: "editContent"
    } as AIEditData
    return data
}


export const createAIEdit = async(db: IDBDatabase, state: EditorState) => {
    const {selectedText, from, to} = getSelectedText(state)
    const edit = await getAITextReplacement(selectedText)
    let editContent = ""
    for await (const value of edit) {
        if (value !== null) {
            editContent += value
        }
    }
    return editContent

}



const getDictionPrompt = (targetSentence: string, precedingSentences: string, succeedingSentences: string) => {
    return `
        Your goal is to improve the diction, word choice, and readability of writing.
        Give a better version of the following sentence: ${targetSentence}


        To help with matching tone, content, etc. here are the sentences before the sentence: ${precedingSentences}
        Here are the sentences after the sentence: ${succeedingSentences}

        Rules:
        1. don't include the period at the end.
        2. don't include ANY explanation. Either give the edited version or respond with ""
        3. match the tone of surrounding sentences as best you can.

        Go:
    `


}

export const createAIEdits = async(db: IDBDatabase, sentences: PositionedSentence[], editor: Editor, contextK = 2) => {
    /*
        For each sentence, get the sentence, and the chunk of sentences around it.
        Send it to the LLM in a prompt to get a better version.
        If the returned data is good/suggests an edit, create an AI Edit object 
        Save edit to IDB
        call addMark on the tr (using for and to)
        dispatch tr
    */
    const {view} = editor
    for (const [index, sentence] of sentences.entries()) {
        const {text, startPos, endPos} = sentence
        const precedingSentences = sentences.slice(Math.max(0, index - contextK), index)
        const succeedingSentences = sentences.slice(index + 1, Math.min(index + contextK + 1, sentences.length))
        const formattedPrompt = getDictionPrompt(
            text, 
            precedingSentences.join("."), 
            succeedingSentences.join(".")
        )
        const editGen =  LLMChat({
            prompt: formattedPrompt,
            priorMessages: [],
            params: {
                stream: false,
                model: ModelTypes.Llama_3_8b
            }
        })
        let editContent = ""
        for await (const value of editGen) {
            editContent += value
        }
        if (editContent.trim() !== "") {
            const AIEditID = generateFileID()
            const AIEditData = {
                editContent: editContent,
                id: AIEditID
            } as AIEditData
            console.log(AIEditData)
            await saveAIEditToDb(AIEditData, db)

            const {state} = view

            const singleTr = state.tr.addMark(
                startPos, 
                endPos, 
                state.schema.marks.AIEdit.create({ AIEditId: AIEditID, color: "#caa5d9"})
            )
            view.dispatch(singleTr)
            console.log("dispatched tr for ", AIEditID)
        }
    }
}