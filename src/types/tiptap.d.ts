import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    replaceText: {
      /**
       * Replace the selected text with new text.
       */
      replaceText: () => ReturnType
    }
  }
}
