import "../styles/format-menu.css"

import { Box, Grid2 } from "@mui/material";
import { Editor, isActive } from "@tiptap/react";
import { Command } from "./Command";
import { useMemo } from "react";
import {
    AddBox,
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatStrikethrough,
    HorizontalRule,
    Link,
    Redo,
    Undo
} from '@mui/icons-material';

interface FormatMenuProps {
    editor: Editor;
}

export const FormatMenu = (props: FormatMenuProps) => {

    const COMMANDS = useMemo(() => [
        {
            "name": "undo",
            "isActive": () => false,
            "disabled": () => !props.editor.can().chain().focus().undo().run(),
            "command": () => props.editor.chain().focus().undo().run(),
            "icon": <Undo/>
        },
        {
            "name": "redo",
            "isActive": () => false,
            "disabled": () => !props.editor.can().chain().focus().redo().run(),
            "command": () => props.editor.chain().focus().redo().run(),
            "icon": <Redo/>
        },
        {
            "name": "bold",
            "isActive": () => props.editor.isActive('bold'),
            "disabled": () => !props.editor.can().chain().focus().toggleBold().run(),
            "command": () => props.editor.chain().focus().toggleBold().run(),
            "icon": <FormatBold/>
        },
        {
            "name": "italic",
            "isActive": () => props.editor.isActive('italic'),
            "disabled": () => !props.editor.can().chain().focus().toggleItalic().run(),
            "command": () => props.editor.chain().focus().toggleItalic().run(),
            "icon": <FormatItalic/>
        },
        {
            "name": "strikethrough",
            "isActive": () => props.editor.isActive('strike'),
            "disabled": () => !props.editor.can().chain().focus().toggleStrike().run(),
            "command": () => props.editor.chain().focus().toggleStrike().run(),
            "icon": <FormatStrikethrough/>
        },
        {
            "name": "code",
            "isActive": () => props.editor.isActive('code'),
            "disabled": () => !props.editor.can().chain().focus().toggleCode().run(),
            "command": () => props.editor.chain().focus().toggleCode().run(),
            "icon": <AddBox/>
        },
        {
            "name": "align left",
            "isActive": () => props.editor.isActive({textAlign: 'left'}),
            "disabled": () => false,
            // "disabled": () => !props.editor.can().chain().focus().setTextAlign('left').run(),
            "command": () => props.editor.chain().focus().setTextAlign('left').run(),
            "icon": <FormatAlignLeft/>
        },
        {
            "name": "align center",
            "isActive": () => props.editor.isActive({textAlign: 'center'}),
            "disabled": () => false,
            // "disabled": () => !props.editor.can().chain().focus().setTextAlign('center').run(),
            "command": () => props.editor.chain().focus().setTextAlign('center').run(),
            "icon": <FormatAlignCenter/>
        },
        {
            "name": "align right",
            "isActive": () => props.editor.isActive({textAlign: 'right'}),
            "disabled": () => false,
            // "disabled": () => !props.editor.can().chain().focus().setTextAlign('right').run(),
            "command": () => props.editor.chain().focus().setTextAlign('right').run(),
            "icon": <FormatAlignRight/>
        },
        {
            "name": "align justify",
            "isActive": () => props.editor.isActive({textAlign: 'justify'}),
            "disabled": () => false,
            // "disabled": () => !props.editor.can().chain().focus().setTextAlign('justify').run(),
            "command": () => props.editor.chain().focus().setTextAlign('justify').run(),
            "icon": <FormatAlignJustify/>
        },
        {
            "name": "bullet list",
            "isActive": () => props.editor.isActive('bulletList'),
            "disabled": () => !props.editor.can().chain().focus().toggleBulletList().run(),
            "command": () => props.editor.chain().focus().toggleBulletList().run(),
            "icon": <FormatListBulleted/>
        },
        {
            "name": "ordered list",
            "isActive": () => props.editor.isActive('orderedList'),
            "disabled": () => !props.editor.can().chain().focus().toggleOrderedList().run(),
            "command": () => props.editor.chain().focus().toggleOrderedList().run(),
            "icon": <FormatListNumbered/>
        },
        {
            "name": "horizontal line",
            "isActive": () => props.editor.isActive('horizontalRule'),
            "disabled": () => !props.editor.can().chain().focus().setHorizontalRule().run(),
            "command": () => props.editor.chain().focus().setHorizontalRule().run(),
            "icon": <HorizontalRule/>
        }
    ], [props.editor])

    return (
        <Grid2 
            container
            className="formatMenuContainer"
            direction="row"
        >
            {COMMANDS.map(command => {
                return (
                    <Grid2>
                        <Command
                            name={command.name}
                            disabled={command.disabled}
                            isActive={command.isActive}
                            command={command.command}
                            icon={command.icon}
                        />
                    </Grid2>
                )
            })}
            
        </Grid2>
    )

}
