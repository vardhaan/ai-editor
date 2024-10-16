import { Undo, Redo, FormatBold, FormatItalic, FormatStrikethrough, AddBox, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered, HorizontalRule, AutoFixNormal } from "@mui/icons-material"
import { Editor } from "@tiptap/react"


export const getAllCommands = (editor: Editor) => {
    return [
        {
            "name": "undo",
            "isActive": () => false,
            "disabled": () => !editor.can().chain().focus().undo().run(),
            "command": () => editor.chain().focus().undo().run(),
            "icon": <Undo/>
        },
        {
            "name": "redo",
            "isActive": () => false,
            "disabled": () => editor.can().chain().focus().redo().run(),
            "command": () => editor.chain().focus().redo().run(),
            "icon": <Redo/>
        },
        {
            "name": "bold",
            "isActive": () => editor.isActive('bold'),
            "disabled": () => !editor.can().chain().focus().toggleBold().run(),
            "command": () => editor.chain().focus().toggleBold().run(),
            "icon": <FormatBold/>
        },
        {
            "name": "italic",
            "isActive": () => editor.isActive('italic'),
            "disabled": () => !editor.can().chain().focus().toggleItalic().run(),
            "command": () => editor.chain().focus().toggleItalic().run(),
            "icon": <FormatItalic/>
        },
        {
            "name": "strikethrough",
            "isActive": () => editor.isActive('strike'),
            "disabled": () => !editor.can().chain().focus().toggleStrike().run(),
            "command": () => editor.chain().focus().toggleStrike().run(),
            "icon": <FormatStrikethrough/>
        },
        {
            "name": "code",
            "isActive": () => editor.isActive('code'),
            "disabled": () => !editor.can().chain().focus().toggleCode().run(),
            "command": () => editor.chain().focus().toggleCode().run(),
            "icon": <AddBox/>
        },
        {
            "name": "align left",
            "isActive": () => editor.isActive({textAlign: 'left'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('left').run(),
            "command": () => editor.chain().focus().setTextAlign('left').run(),
            "icon": <FormatAlignLeft/>
        },
        {
            "name": "align center",
            "isActive": () => editor.isActive({textAlign: 'center'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('center').run(),
            "command": () => editor.chain().focus().setTextAlign('center').run(),
            "icon": <FormatAlignCenter/>
        },
        {
            "name": "align right",
            "isActive": () => editor.isActive({textAlign: 'right'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('right').run(),
            "command": () => editor.chain().focus().setTextAlign('right').run(),
            "icon": <FormatAlignRight/>
        },
        {
            "name": "align justify",
            "isActive": () => editor.isActive({textAlign: 'justify'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('justify').run(),
            "command": () => editor.chain().focus().setTextAlign('justify').run(),
            "icon": <FormatAlignJustify/>
        },
        {
            "name": "bullet list",
            "isActive": () => editor.isActive('bulletList'),
            "disabled": () => !editor.can().chain().focus().toggleBulletList().run(),
            "command": () => editor.chain().focus().toggleBulletList().run(),
            "icon": <FormatListBulleted/>
        },
        {
            "name": "ordered list",
            "isActive": () => editor.isActive('orderedList'),
            "disabled": () => !editor.can().chain().focus().toggleOrderedList().run(),
            "command": () => editor.chain().focus().toggleOrderedList().run(),
            "icon": <FormatListNumbered/>
        },
        {
            "name": "horizontal line",
            "isActive": () => editor.isActive('horizontalRule'),
            "disabled": () => !editor.can().chain().focus().setHorizontalRule().run(),
            "command": () => editor.chain().focus().setHorizontalRule().run(),
            "icon": <HorizontalRule/>
        },
        {
            "name": "replace text with AI",
            "isActive": () => false,
            "disabled": () => false,
            "command": () => editor.commands.replaceText(),
            "icon": <AutoFixNormal />

        }
    ]
}

export const getMenuCommands = (editor: Editor) => {
    return [
        {
            "name": "undo",
            "isActive": () => false,
            "disabled": () => !editor.can().chain().focus().undo().run(),
            "command": () => editor.chain().focus().undo().run(),
            "icon": <Undo/>
        },
        {
            "name": "redo",
            "isActive": () => false,
            "disabled": () => editor.can().chain().focus().redo().run(),
            "command": () => editor.chain().focus().redo().run(),
            "icon": <Redo/>
        },
        {
            "name": "bold",
            "isActive": () => editor.isActive('bold'),
            "disabled": () => !editor.can().chain().focus().toggleBold().run(),
            "command": () => editor.chain().focus().toggleBold().run(),
            "icon": <FormatBold/>
        },
        {
            "name": "italic",
            "isActive": () => editor.isActive('italic'),
            "disabled": () => !editor.can().chain().focus().toggleItalic().run(),
            "command": () => editor.chain().focus().toggleItalic().run(),
            "icon": <FormatItalic/>
        },
        {
            "name": "strikethrough",
            "isActive": () => editor.isActive('strike'),
            "disabled": () => !editor.can().chain().focus().toggleStrike().run(),
            "command": () => editor.chain().focus().toggleStrike().run(),
            "icon": <FormatStrikethrough/>
        },
        {
            "name": "code",
            "isActive": () => editor.isActive('code'),
            "disabled": () => !editor.can().chain().focus().toggleCode().run(),
            "command": () => editor.chain().focus().toggleCode().run(),
            "icon": <AddBox/>
        },
        {
            "name": "align left",
            "isActive": () => editor.isActive({textAlign: 'left'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('left').run(),
            "command": () => editor.chain().focus().setTextAlign('left').run(),
            "icon": <FormatAlignLeft/>
        },
        {
            "name": "align center",
            "isActive": () => editor.isActive({textAlign: 'center'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('center').run(),
            "command": () => editor.chain().focus().setTextAlign('center').run(),
            "icon": <FormatAlignCenter/>
        },
        {
            "name": "align right",
            "isActive": () => editor.isActive({textAlign: 'right'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('right').run(),
            "command": () => editor.chain().focus().setTextAlign('right').run(),
            "icon": <FormatAlignRight/>
        },
        {
            "name": "align justify",
            "isActive": () => editor.isActive({textAlign: 'justify'}),
            "disabled": () => false,
            // "disabled": () => !editor.can().chain().focus().setTextAlign('justify').run(),
            "command": () => editor.chain().focus().setTextAlign('justify').run(),
            "icon": <FormatAlignJustify/>
        },
        {
            "name": "bullet list",
            "isActive": () => editor.isActive('bulletList'),
            "disabled": () => !editor.can().chain().focus().toggleBulletList().run(),
            "command": () => editor.chain().focus().toggleBulletList().run(),
            "icon": <FormatListBulleted/>
        },
        {
            "name": "ordered list",
            "isActive": () => editor.isActive('orderedList'),
            "disabled": () => !editor.can().chain().focus().toggleOrderedList().run(),
            "command": () => editor.chain().focus().toggleOrderedList().run(),
            "icon": <FormatListNumbered/>
        },
        {
            "name": "horizontal line",
            "isActive": () => editor.isActive('horizontalRule'),
            "disabled": () => !editor.can().chain().focus().setHorizontalRule().run(),
            "command": () => editor.chain().focus().setHorizontalRule().run(),
            "icon": <HorizontalRule/>
        }
    ]
}

