import "../../styles/scratchpad.css"

import { useEffect, useState } from "react";
import { useDisclose } from "../../hooks/useDisclose";
import { CommandType } from "../../lib/commands";
import { CommandContainer } from "./Command";
import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import { TextPopper } from "./TextPopper";
import { Editor } from "@tiptap/react";

interface ScratchPadProps {
    command: CommandType;
    editor?: Editor;
    onCommandClick?: () => void;
}

export const ScratchPad = (props: ScratchPadProps) => {
    const scratchPadDisclose = useDisclose(false)
    const insertButtonDisclose = useDisclose(false)
    const [text, setText] = useState("")
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const [selectedText, setSelectedText] = useState("")

    const updateSelectedText = (newText: string) => {
        setSelectedText(newText)
        console.log("new insertable text", newText)
    }

    useEffect(() => {
        console.log("selected text changed:", selectedText)
        if (selectedText !== "") {
            insertButtonDisclose.onOpen()
        }
    }, [selectedText])

    const onButtonClick = () => {
        const anchor = getSelectionAnchor(props.editor)
        if (anchor) {
            setAnchorEl(anchor)
            scratchPadDisclose.onOpen()
        } //todo: may need to remove anchor el on unmount
    }


    useEffect(() => {
        if (!anchorEl) {
            scratchPadDisclose.onClose()
        }
    }, [anchorEl])

    const insertScratchPadText = () => {
        insertText(selectedText)
        scratchPadDisclose.onClose()
    }

    const insertText = (text: string) => {
        if (props.editor) {
            const newTextNode = props.editor.state.schema.text(text)
            const transaction = props.editor.state.tr.replaceSelectionWith(newTextNode)
            props.editor.view.dispatch(transaction)
        }
    }



    return (
        <ClickAwayListener
            onClickAway={() => scratchPadDisclose.onClose()}
        >
            <Box className="scratchpad">
                <CommandContainer 
                    command={props.command} 
                    onCommandClick={onButtonClick} 
                />
                    <TextPopper
                        text={text}
                        onTextChange={setText}
                        open={scratchPadDisclose.isOpen}
                        onClose={scratchPadDisclose.onClose}
                        anchorEl={anchorEl}
                        selectedText={selectedText}
                        updateSelectedText={updateSelectedText}
                    >
                        <Box className="scratchpadInsertButton">
                            <Button 
                                disabled={!insertButtonDisclose.isOpen}
                                onClick={() => insertScratchPadText()}
                            >
                                Insert
                            </Button>
                        </Box>
                        
                    </TextPopper>
            </Box>
        </ClickAwayListener>
    )

}


const getSelectionAnchor = (editor?: Editor) => {
    if (!editor) {
        return
    }
    const selection = editor.view.state.selection
    if (selection) {
        const {from, to} = selection;
        const fromRect = editor.view.coordsAtPos(from)
        const toRect = editor.view.coordsAtPos(to)
        const maxYSelection = toRect.bottom
        const middleXSelection = (fromRect.left + toRect.right)/2
        const anchor = document.createElement("div")
        anchor.style.position = "absolute"
        anchor.style.top = `${maxYSelection+5}px`
        anchor.style.left = `${middleXSelection}px`
        document.body.appendChild(anchor)
        return anchor
    }
    return null
}