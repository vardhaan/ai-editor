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
    state.doc.nodesBetween
    const selectedText = getText(state, from, to)
    return { selectedText, from, to }
}

// export const addCommentToNodes = (n)