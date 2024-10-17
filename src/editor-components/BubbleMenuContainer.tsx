import { Box, ButtonGroup, Card } from "@mui/material";
import { BubbleMenu, Editor } from "@tiptap/react";
import { getBubbleMenuCommands } from "../lib/commands";
import { useMemo } from "react";
import { Command } from "./Command";


interface BubbleMenuContainerProps {
    editor: Editor;
}

export const BubbleMenuContainer = (props: BubbleMenuContainerProps) => {

    const commands = useMemo(() => getBubbleMenuCommands(props.editor), [props.editor])

    return (
        <Box className="bubbleMenuContainer">
            <BubbleMenu className="bubbleMenu" editor={props.editor}>
                <Card className="bubbleMenuCard">
                    <ButtonGroup
                        size="small"
                        className="bubbleMenuButtonGroup"
                    >
                        {commands.map(command => {
                            return (
                                <Command
                                    name={command.name}
                                    disabled={command.disabled}
                                    isActive={command.isActive}
                                    command={command.command}
                                    icon={command.icon}
                                />
                            )
                        })}
                    </ButtonGroup>
                </Card>
            </BubbleMenu>
        </Box>
    )
}