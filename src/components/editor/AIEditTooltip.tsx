import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { getAIEditFromDb } from '../../lib/io';
import { useDB } from '../../hooks/useDB';
import { AIEditData } from '../../types/aiedit';

interface AIEditTooltipProps {

}

export const AIEditTooltip = (props: AIEditTooltipProps) => {

    const {db} = useDB()
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);
    const [AIEditContent, setAIEditContent] = useState<string>("");
    const [currentEditId, setCurrentEditId] = useState<string>("");

    const handleMouseOver = (event: MouseEvent) => {
        console.log("mouseover!")
        const target = event.target as HTMLElement
        const id = target.getAttribute("aieditid")

        if (id) {
            console.log(id)
            setCurrentEditId(id)
            setAnchorEl(target)
        }
    }

    useEffect(() => {
        if (currentEditId!=="" && db) {
            getAIEditFromDb(currentEditId, db).then(data => {
                const editData = data as AIEditData
                setAIEditContent(editData.editContent)
            }).catch(error => {
                console.error("Failed to fetch AI edit content:", error);
                setAIEditContent("Error fetching content.");
            })
        } else {
            setAIEditContent("")
        }
    }, [currentEditId])
    
    const handleMouseOut = () => {
        setAnchorEl(null)
        setCurrentEditId("")
    }

    useEffect(() => {
        const editorElement = document.querySelector(".ProseMirror")

        if (editorElement) {
            editorElement.addEventListener("mouseover", handleMouseOver as EventListener)
            editorElement.addEventListener("mouseout", handleMouseOut)
        }

        return () => {
            if (editorElement) {
                editorElement.removeEventListener("mouseover", handleMouseOver as EventListener)
                editorElement.removeEventListener("mouseout", handleMouseOut)
            }
        }
    }, [])

    return (
        <Tooltip
            open={!!anchorEl}
            title={AIEditContent}
            placement="top"
            arrow
            PopperProps={{
                anchorEl: anchorEl
            }}
            className='tooltip'
        >
            <div />
        </Tooltip>
    
    )
}