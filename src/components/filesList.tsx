import { Box, Button, Grid2 } from "@mui/material";
import { DocumentData } from "../types/document";



export interface FilesListProps {
    files: DocumentData[]
    currFile: DocumentData
    selectNewFile: (file: DocumentData) => void;
}

export const FilesList = (props: FilesListProps) => {

    const onFileClick = (file: DocumentData) => {
        props.selectNewFile(file)
    }

    return (
        <Grid2 
            className="file-list"
            container
            direction="column"
            spacing={1}
        >
            {props.files.map(file => {
                return (
                    <Button
                        onClick={() => onFileClick(file)}
                        variant={file === props.currFile ? "contained" : "text"}
                        color={file === props.currFile ? "primary" : "inherit"}
                    >
                        {file.filename}
                    </Button>
                )
            })}
        </Grid2>
    )
}

