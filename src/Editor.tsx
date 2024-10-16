import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './styles/editor.css'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { FormatMenu } from './editor-components/FormatMenu'
import { Box } from '@mui/material'
import { Extension } from '@tiptap/core'; // Ensure you have the correct import
import ReplaceTextAI from './editor-extensions/replaceTextAI'
import { useEffect } from 'react'



const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote', 'codeBlock', 'listItem', 'image'],
        alignments: ["left", "center", "right", "justify"]
    }),
    Placeholder.configure({
        placeholder: "...",
        showOnlyWhenEditable: false
    }),
    ReplaceTextAI
    
  ]
const content = ""

const TextEditor = () => {

    

    const editor = useEditor(
        {
            extensions: extensions as Extension[], // Cast extensions to Extension[]
            content,
            autofocus: true,
            
        },
    )

    useEffect(() => {
        if (editor) {
          console.log('Available Commands:', Object.keys(editor.commands))
        }
    }, [editor])

    return (
        <>
            {editor && <FormatMenu editor={editor} />}
            <Box className="tiptapContainer">
                <EditorContent className="tiptap" editor={editor} />
            </Box>
            
            {/* <BubbleMenu editor={editor}>Bubble Menu</BubbleMenu> */}
        </>
    )
}

export default TextEditor;