import { Extension } from '@tiptap/core'
import { getAITextReplacement } from '../lib/ai'

const ReplaceTextAI = Extension.create({
  name: 'replaceTextAI',

  addCommands() {
    return {
      /**
       * Replace the selected text with new text.
       *
       * @param getNewText A function that takes the current text and returns the new text.
       */
      replaceText: () => ({ state, view }) => {
        const { from, to } = state.selection
        const selectedText = state.doc.textBetween(from, to, '')

        getAITextReplacement(selectedText).then(async (newTextGenerator) => {
            let newText = "";
            for await (const text of newTextGenerator) {
                newText += text || ""
            }
            console.log("this is NEW TEXT", newText)
            const transaction = state.tr.replaceWith(from, to, state.schema.text(newText));
            view.dispatch(transaction)
        }).catch(error => {
            console.error("LLM Chat error", error)
        })
        return true;
      },
    }
  },
})

export default ReplaceTextAI