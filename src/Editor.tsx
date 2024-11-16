import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './styles/editor.css'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { FormatMenu } from './components/editor/FormatMenu'
import { Box } from '@mui/material'
import { Extension } from '@tiptap/core'; // Ensure you have the correct import
import ReplaceTextAI from './editor-extensions/replaceTextAI'
import { useEffect } from 'react'
import Highlight from '@tiptap/extension-highlight'
import { BubbleMenuContainer } from './components/editor/BubbleMenuContainer'
import Heading from '@tiptap/extension-heading'
import { DocumentData } from './types/document'




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
    ReplaceTextAI,
    Highlight.configure({ multicolor: true }),
    Heading.configure({
        levels: [1, 2, 3],
    }),
  ]

interface TextEditorProps {
    file: DocumentData;
    onFileUpdate: (newFile: DocumentData) => void;
}

const TextEditor = (props: TextEditorProps) => {


    useEffect(() => {
        const newContent = props.file.data ? JSON.parse(props.file.data) : ""
        editor?.commands.setContent(newContent)
    }, [props.file.id])
    
    

    const editor = useEditor(
        {
            extensions: extensions as Extension[], // Cast extensions to Extension[]
            content: props.file.data,
            autofocus: true,
            onUpdate: ({ editor }) => {
                const json = editor.getJSON()
                const jsonString = JSON.stringify(json, null, 2)
                const docData = {
                    id: props.file.id,
                    filename: props.file.filename,
                    data: jsonString
                }
                props.onFileUpdate(docData)
            }
            
        },
    )



    return (
        <Box className="editorPageContainer">
            {editor && <FormatMenu editor={editor} />}
            <Box className="tiptapContainer">
                <EditorContent className="tiptap" editor={editor} />
            </Box>
            
            {editor && <BubbleMenuContainer editor={editor} />}
        </Box>
    )
}

export default TextEditor;