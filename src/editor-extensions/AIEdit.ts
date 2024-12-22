import { Mark } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/react'



declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    AIEdit: {
      setAIEdit: (AIEditId: string, color: string) => ReturnType,
      unsetAIEdit: () => ReturnType
    }
  }
}

export const AIEdit = Mark.create({
    name: 'AIEdit',

    addAttributes() {
        return {
            AIEditId: {
                default: null
            },
            color: {
                default: "#caa5d9"
            }
        }
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(
                HTMLAttributes,
                {
                    style: `background-color: ${HTMLAttributes.color}; cursor: pointer;`,
                    "AIEditId": HTMLAttributes.AIEditId,
                    class: "AIEdit"
                },
            ),
        ]
    },

    addCommands() {
        return {
            setAIEdit: (AIEditId: string, color: string) => ({ commands, state }) => {
                console.log("AI EDIT MARK SET")
                return commands.setMark(this.name, { AIEditId, color })
            },
            unsetAIEdit: () => ({ commands }) => {
                return commands.unsetMark(this.name)
            }
        }
    },
    }
)