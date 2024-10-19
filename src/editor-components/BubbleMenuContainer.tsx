import { Box, ButtonGroup, Card } from "@mui/material";
import { BubbleMenu, Editor } from "@tiptap/react";
import { getBubbleMenuCommands } from "../lib/commands";
import { useMemo } from "react";
import { CommandContainer } from "./Command";
import { ScratchPad } from "./Scratchpad";



interface BubbleMenuContainerProps {
    editor: Editor;
}

export const BubbleMenuContainer = (props: BubbleMenuContainerProps) => {

    const commands = useMemo(() => getBubbleMenuCommands(props.editor), [props.editor])

    const findCommandByName = (name: string) => {
        return commands.find(command => command.name === name)
    }

    const commandReplaceTextAI = findCommandByName("replace text with AI")
    const commandScratchpad = findCommandByName("scratchpad")



    return (
        <Box className="bubbleMenuContainer">
            <BubbleMenu className="bubbleMenu" editor={props.editor}>
                <Card className="bubbleMenuCard">
                    <ButtonGroup
                        size="small"
                        className="bubbleMenuButtonGroup"
                    >
                        {commandReplaceTextAI && (
                            <CommandContainer command={commandReplaceTextAI} />
                        )}
                        {commandScratchpad && (
                            <ScratchPad command={commandScratchpad} editor={props.editor} />
                        )}
                    </ButtonGroup>
                </Card>
            </BubbleMenu>
        </Box>
    )
}