import "../../styles/format-menu.css"

import { Grid2 } from "@mui/material";
import { Editor } from "@tiptap/react";
import { CommandContainer, GroupCommandDropDown } from "./Command";
import { useMemo } from "react";

import { CommandType, getFormatMenuCommands, GroupCommandType } from "../../lib/commands";

interface FormatMenuProps {
    editor: Editor;
}

export const FormatMenu = (props: FormatMenuProps) => {

    const commands = useMemo(() => getFormatMenuCommands(props.editor), [props.editor])

    const handleSingleCommand = (command: CommandType) => {
        return (
            <Grid2>
                <CommandContainer
                    command={command}
                />
            </Grid2>
        )
    }

    const handleGroupCommand = (groupCommand: GroupCommandType) => {
        return (
            <Grid2>
                <GroupCommandDropDown
                    commands={groupCommand.commands}
                    defaultSelected={groupCommand.defaultCommand}
                    width="60px"
                />
            </Grid2>
        )
    }

    const handleCommand = (command: CommandType | GroupCommandType) => {
        if ('commands' in command) {
            return handleGroupCommand(command);
        } else {
            return handleSingleCommand(command);
        }
    }

    return (
        <Grid2 
            container
            className="formatMenuContainer"
            direction="row"
        >
            {commands.map(command => {
                return handleCommand(command)
            })}
            
        </Grid2>
    )

}
