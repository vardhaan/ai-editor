import "../../styles/format-menu.css"
import React from "react";
import { Grid2 } from "@mui/material";
import { Editor } from "@tiptap/react";
import { CommandContainer, GroupCommandDropDown } from "./Command";
import { useEffect, useMemo, useState } from "react";

import { CommandType, getFormatMenuCommands, GroupCommandType } from "../../lib/commands";
import { useDB } from "../../hooks/useDB";
import { createAIEdit } from "../../lib/ai";
import { generateFileID, saveAIEditToDb } from "../../lib/io";
import { AIEditData } from "../../types/aiedit";

interface FormatMenuProps {
    editor: Editor;
}

export const FormatMenu = React.memo((props: FormatMenuProps) => {

    const {db} = useDB()
    const commands = useMemo(() => getFormatMenuCommands(props.editor), [])
    const [updatedCommands, setUpdatedCommands] = useState<(CommandType | GroupCommandType)[]>([])

    useEffect(() => {
        const newUpdatedCommands = commands.map((command) => {
            if (command.name === "AI Edit" && db) {
                const typedCommand = command as CommandType;
                return {
                    ...typedCommand,
                    command: () => {
                        const AIEditID = generateFileID();
                        createAIEdit(db, props.editor.state).then(edit => {
                            const data = {
                                id: AIEditID,
                                editContent: edit
                            } as AIEditData
                            saveAIEditToDb(data, db)
                        })
                        return typedCommand.command(AIEditID)
                    }
                }
            }
            return command
        })
        setUpdatedCommands(newUpdatedCommands)
    }, [commands, db])

 


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
            {updatedCommands.map(command => {
                return handleCommand(command)
            })}
            
        </Grid2>
    )

})
