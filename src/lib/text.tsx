import { Node } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";



export const getText = (state: EditorState, from?: number, to?: number) => {
    if (!from && !to) {
        return state.doc.textContent
    }
    const start = from || 0;
    const end = to || state.doc.content.size;
    return state.doc.textBetween(start, end, '')
}

export const getSelectedText = (state: EditorState) => {
    const { from, to } = state.selection
    const selectedText = getText(state, from, to)
    return { selectedText, from, to }
}

// export const addCommentToNodes = (n)

export interface PositionedSentence {
    text: string;
    startPos: number;
    endPos: number; //sentence runs up to endPos-1
}

export const splitNodeTextIntoSentences = (node: Node, nodePos: number) => {
    if (!node.isText) {
        return []
    }
    const text = node.text ?? ""
    const positionedSentences: PositionedSentence[] = []
    const splitText = text.split('.')
    let offset = 0;
    splitText.forEach(text => {
        positionedSentences.push({
            text: text,
            startPos: nodePos + offset,
            endPos: nodePos + offset + text.length
        })
        offset += text.length + 1
    })
    return positionedSentences
}

//todo: make a function that iterates through all nodes and does the splitNodeText

export const splitAllNodeTextsIntoSentences = (state: EditorState) => {
    const positionedSentences: PositionedSentence[] = []
    state.doc.descendants((node, pos) => {
        const nodePositionedSentences = splitNodeTextIntoSentences(node, pos)
        positionedSentences.push(...nodePositionedSentences)
    })
    return positionedSentences
}