import { useState } from "react"
import { generateFileID } from "../lib/io"
import { DocumentData } from "../types/document"


export const useFiles = () => {
    const newFileID = generateFileID()
    const newFilename = "New Document"
    const newContent = ""
    const newDoc = {
        id: newFileID,
        filename: newFilename,
        data: newContent
    }

    const [file, setFile] = useState<DocumentData>(newDoc)
    const [allFiles, setAllFiles] = useState<DocumentData[]>([])



    return {file, setFile, allFiles, setAllFiles}
}