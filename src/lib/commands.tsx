import { Undo, Redo, FormatBold, FormatItalic, FormatStrikethrough, AddBox, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered, HorizontalRule, AutoFixNormal, AltRoute } from "@mui/icons-material"
import { Editor }  from "@tiptap/react"

export interface CommandType {
    name: string;
    isActive: () => boolean;
    disabled: () => boolean;
    command: () => boolean;
    icon?: JSX.Element,
}

export interface GroupCommandType {
    name: string;
    commands: CommandType[];
    defaultCommand: string;
    icon?: JSX.Element;
}


export const getAllCommands = (editor: Editor): (CommandType|GroupCommandType)[] => {
    return [
        {
            name: "undo",
            isActive: () => false,
            disabled: () => !editor.can().chain().focus().undo().run(),
            command: () => editor.chain().focus().undo().run(),
            icon: <Undo/>,
        } as CommandType,
        {
            name: "redo",
            isActive: () => false,
            disabled: () => editor.can().chain().focus().redo().run(),
            command: () => editor.chain().focus().redo().run(),
            icon: <Redo/>,
            
        } as CommandType,
        {
            name: "bold",
            isActive: () => editor.isActive('bold'),
            disabled: () => !editor.can().chain().focus().toggleBold().run(),
            command: () => editor.chain().focus().toggleBold().run(),
            icon: <FormatBold/>,
            
        } as CommandType,
        {
            name: "italic",
            isActive: () => editor.isActive('italic'),
            disabled: () => !editor.can().chain().focus().toggleItalic().run(),
            command: () => editor.chain().focus().toggleItalic().run(),
            icon: <FormatItalic/>,
            
        } as CommandType,
        {
            name: "strikethrough",
            isActive: () => editor.isActive('strike'),
            disabled: () => !editor.can().chain().focus().toggleStrike().run(),
            command: () => editor.chain().focus().toggleStrike().run(),
            icon: <FormatStrikethrough/>,
            
        } as CommandType,
        {
            name: "code",
            isActive: () => editor.isActive('code'),
            disabled: () => !editor.can().chain().focus().toggleCode().run(),
            command: () => editor.chain().focus().toggleCode().run(),
            icon: <AddBox/>,
            
        } as CommandType,
        {
            name: "align left",
            isActive: () => editor.isActive({textAlign: 'left'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('left').run(),
            command: () => editor.chain().focus().setTextAlign('left').run(),
            icon: <FormatAlignLeft/>,
            
        } as CommandType,
        {
            name: "align center",
            isActive: () => editor.isActive({textAlign: 'center'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('center').run(),
            command: () => editor.chain().focus().setTextAlign('center').run(),
            icon: <FormatAlignCenter/>,
            
        } as CommandType,
        {
            name: "align right",
            isActive: () => editor.isActive({textAlign: 'right'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('right').run(),
            command: () => editor.chain().focus().setTextAlign('right').run(),
            icon: <FormatAlignRight/>,
            
        } as CommandType,
        {
            name: "align justify",
            isActive: () => editor.isActive({textAlign: 'justify'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('justify').run(),
            command: () => editor.chain().focus().setTextAlign('justify').run(),
            icon: <FormatAlignJustify/>,
            
        } as CommandType,
        {
            name: "bullet list",
            isActive: () => editor.isActive('bulletList'),
            disabled: () => !editor.can().chain().focus().toggleBulletList().run(),
            command: () => editor.chain().focus().toggleBulletList().run(),
            icon: <FormatListBulleted/>,
            
        } as CommandType,
        {
            name: "ordered list",
            isActive: () => editor.isActive('orderedList'),
            disabled: () => !editor.can().chain().focus().toggleOrderedList().run(),
            command: () => editor.chain().focus().toggleOrderedList().run(),
            icon: <FormatListNumbered/>,
            
        } as CommandType,
        {
            name: "horizontal line",
            isActive: () => editor.isActive('horizontalRule'),
            disabled: () => !editor.can().chain().focus().setHorizontalRule().run(),
            command: () => editor.chain().focus().setHorizontalRule().run(),
            icon: <HorizontalRule/>,
            
        } as CommandType,
        {
            name: "replace text with AI",
            isActive: () => false,
            disabled: () => false,
            command: () => editor.chain().focus().replaceText().run(),
            icon: <AutoFixNormal />,
            
        } as CommandType,
        {
            name: "Heading",
            commands: [
                {
                    name: "H1",
                    isActive: () => editor.isActive('heading', { level: 1 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 1 }).run(),
                    
                } as CommandType,
                {
                    name: "H2",
                    isActive: () => editor.isActive('heading', { level: 2 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 2 }).run(),
                    
                } as CommandType,
                {
                    name: "H3",
                    isActive: () => editor.isActive('heading', { level: 3 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 3 }).run(),
                    
                } as CommandType,
                {
                    name: "P",
                    isActive: () => editor.isActive("paragraph"),
                    disabled: () => !editor.can().chain().focus().setParagraph().run(),
                    command: () => editor.chain().focus().setParagraph().run(),
                    
                } as CommandType
            ],
            defaultCommand: "P"
        } as GroupCommandType,
        {
            name: "scratchpad",
            isActive: () => false,
            disabled: () => false,
            command: () => true,
            icon: <AltRoute />
        } as CommandType
    ]
}

export const getFormatMenuCommands = (editor: Editor) => {
    return [
        {
            name: "undo",
            isActive: () => false,
            disabled: () => !editor.can().chain().focus().undo().run(),
            command: () => editor.chain().focus().undo().run(),
            icon: <Undo/>,
            
        } as CommandType,
        {
            name: "redo",
            isActive: () => false,
            disabled: () => editor.can().chain().focus().redo().run(),
            command: () => editor.chain().focus().redo().run(),
            icon: <Redo/>,
            
        } as CommandType,
        {
            name: "bold",
            isActive: () => editor.isActive('bold'),
            disabled: () => !editor.can().chain().focus().toggleBold().run(),
            command: () => editor.chain().focus().toggleBold().run(),
            icon: <FormatBold/>,
            
        } as CommandType,
        {
            name: "italic",
            isActive: () => editor.isActive('italic'),
            disabled: () => !editor.can().chain().focus().toggleItalic().run(),
            command: () => editor.chain().focus().toggleItalic().run(),
            icon: <FormatItalic/>,
            
        } as CommandType,
        {
            name: "strikethrough",
            isActive: () => editor.isActive('strike'),
            disabled: () => !editor.can().chain().focus().toggleStrike().run(),
            command: () => editor.chain().focus().toggleStrike().run(),
            icon: <FormatStrikethrough/>,
            
        } as CommandType,
        {
            name: "code",
            isActive: () => editor.isActive('code'),
            disabled: () => !editor.can().chain().focus().toggleCode().run(),
            command: () => editor.chain().focus().toggleCode().run(),
            icon: <AddBox/>,
            
        } as CommandType,
        {
            name: "align left",
            isActive: () => editor.isActive({textAlign: 'left'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('left').run(),
            command: () => editor.chain().focus().setTextAlign('left').run(),
            icon: <FormatAlignLeft/>,
            
        } as CommandType,
        {
            name: "align center",
            isActive: () => editor.isActive({textAlign: 'center'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('center').run(),
            command: () => editor.chain().focus().setTextAlign('center').run(),
            icon: <FormatAlignCenter/>,
            
        } as CommandType,
        {
            name: "align right",
            isActive: () => editor.isActive({textAlign: 'right'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('right').run(),
            command: () => editor.chain().focus().setTextAlign('right').run(),
            icon: <FormatAlignRight/>,
            
        } as CommandType,
        {
            name: "align justify",
            isActive: () => editor.isActive({textAlign: 'justify'}),
            disabled: () => false,
            // disabled: () => !editor.can().chain().focus().setTextAlign('justify').run(),
            command: () => editor.chain().focus().setTextAlign('justify').run(),
            icon: <FormatAlignJustify/>,
            
        } as CommandType,
        {
            name: "bullet list",
            isActive: () => editor.isActive('bulletList'),
            disabled: () => !editor.can().chain().focus().toggleBulletList().run(),
            command: () => editor.chain().focus().toggleBulletList().run(),
            icon: <FormatListBulleted/>,
            
        } as CommandType,
        {
            name: "ordered list",
            isActive: () => editor.isActive('orderedList'),
            disabled: () => !editor.can().chain().focus().toggleOrderedList().run(),
            command: () => editor.chain().focus().toggleOrderedList().run(),
            icon: <FormatListNumbered/>,
            
        } as CommandType,
        {
            name: "horizontal line",
            isActive: () => editor.isActive('horizontalRule'),
            disabled: () => !editor.can().chain().focus().setHorizontalRule().run(),
            command: () => editor.chain().focus().setHorizontalRule().run(),
            icon: <HorizontalRule/>,
            
        } as CommandType,
        {
            name: "Heading",
            commands: [
                {
                    name: "H1",
                    isActive: () => editor.isActive('heading', { level: 1 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 1 }).run(),
                    
                } as CommandType,
                {
                    name: "H2",
                    isActive: () => editor.isActive('heading', { level: 2 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 2 }).run(),
                    
                } as CommandType,
                {
                    name: "H3",
                    isActive: () => editor.isActive('heading', { level: 3 }),
                    disabled: () => !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
                    command: () => editor.chain().focus().setHeading({ level: 3 }).run(),
                    
                } as CommandType,
                {
                    name: "P",
                    isActive: () => editor.isActive("paragraph"),
                    disabled: () => !editor.can().chain().focus().setParagraph().run(),
                    command: () => editor.chain().focus().setParagraph().run(),
                    
                } as CommandType
            ],
            defaultCommand: "P"
        } as GroupCommandType
    ]
}

export const getBubbleMenuCommands = (editor: Editor) => {
    return [
        {
            name: "replace text with AI",
            isActive: () => false,
            disabled: () => false,
            command: () => editor.chain().focus().replaceText().run(),
            icon: <AutoFixNormal />,
            
        } as CommandType,
        {
            name: "scratchpad",
            isActive: () => false,
            disabled: () => false,
            command: () => true,
            icon: <AltRoute />
        } as CommandType
    ]
}