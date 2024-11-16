import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../styles/textpopper.css"

import { Box, Popper, TextField } from "@mui/material";


interface TextPopperProps {
    text: string;
    onTextChange: (newText: string) => void;
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
    children?: React.ReactNode
    selectedText: string;
    updateSelectedText: (newText: string) => void;
}

export const TextPopper = (props: TextPopperProps) => {


    const handleMouseUp = (e: React.MouseEvent) => {
        const target = e.target as HTMLInputElement
        const {selectionStart, selectionEnd, value} = target
        console.log(selectionStart, selectionEnd, value)
        if (selectionStart && selectionEnd) {
            if (selectionStart >= selectionEnd) {
                props.updateSelectedText("")
            } else {
                const selectedVal = value.substring(selectionStart, selectionEnd)
                props.updateSelectedText(selectedVal)
            }
        }
    }


    return (
        <Popper open={props.open} anchorEl={props.anchorEl} className="textPopper">
            <Box className="textPopperContents">
                <TextField 
                    className="textPopperTextField"
                    hidden={false}
                    value={props.text}
                    onChange={(e) => props.onTextChange(e.target.value)}
                    multiline
                    placeholder="Scratchpad"
                    onMouseUp={handleMouseUp}
                    
                />
                <Box>
                    {props.children}
                </Box>
                
            </Box>
        </Popper>
    )
}
