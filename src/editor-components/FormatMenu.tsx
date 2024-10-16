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
import { getAllCommands, getMenuCommands } from "../lib/commands";

interface FormatMenuProps {
    editor: Editor;
}

export const FormatMenu = (props: FormatMenuProps) => {

    const commands = useMemo(() => getAllCommands(props.editor), [props.editor])

    return (
        <Grid2 
            container
            className="formatMenuContainer"
            direction="row"
        >
            {commands.map(command => {
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
