import { EditorState } from "@tiptap/pm/state"
import { AIEditData } from "../types/aiedit"
import { generateFileID, saveAIEditToDb } from "./io"
import { LLMChat, ModelTypes } from "./llmChat"
import { getSelectedText } from "./text"




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