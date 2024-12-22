import { Extension } from '@tiptap/core'
import { getAITextReplacement } from '../lib/ai'
import { getSelectedText, getText } from '../lib/text'

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
        const {selectedText, from, to} = getSelectedText(state)

        getAITextReplacement(selectedText).then(async (newTextGenerator) => {
            let newText = "";
            for await (const text of newTextGenerator) {
                newText += text || ""
            }
            const transaction = state.tr.replaceWith(from, to, state.schema.text(newText));
            // const highlightMark = state.schema.marks.highlight.create({ color: "#bf92e8" }); // Assuming 'highlight' is defined in your schema
            // transaction.addMark(from, from + newText.length, highlightMark);
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