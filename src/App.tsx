import './styles/app.css'
import { Box, IconButton, TextField } from '@mui/material'
import TextEditor from './Editor'
import { useFiles } from './hooks/useFiles'
import { useDB } from './hooks/useDB';
import { getAllFilesFromDb, saveJsonToDb } from './lib/io';
import { DocumentData } from './types/document';
import { useEffect, useState } from 'react';
import { FilesList } from './components/filesList';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function Post() {

  const {file, setFile, allFiles, setAllFiles} = useFiles();
  const {db} = useDB()

  const [isFilesListVisible, setIsFilesListVisible] = useState(true)

  useEffect(() => {
    if (db) {
      getAllFilesFromDb(db).then(files => {
          setAllFiles(files as DocumentData[])
      }).catch((error) => {
          console.error(error)
      })
    }
  }, [db])


  const onFileUpdate = (updatedFile: DocumentData) => {
    if (db) {
      saveJsonToDb(updatedFile, db).then(() => {
        setFile(updatedFile)
        setAllFiles(prevFiles => {
          const existingFile = prevFiles.find(file => file.id === updatedFile.id)
          if (existingFile) {
            return prevFiles.map(file => file.id === updatedFile.id ? updatedFile : file)
          } else {
            return [updatedFile, ...prevFiles]
          }
        })
      })
    }
  }

  const selectNewFile = (newFile: DocumentData) => {
    setFile(newFile)
  }

  const updateFilename = (newFilename: string) => {
    const newFile = {
      ...file,
      filename: newFilename
    }
    onFileUpdate(newFile)
  }

  return (
    <Box className="app">
      {/* <div className="pulse"></div> */}
      <Box className="files-box">
        <Box className="filename-input-box">
          <TextField
            value={file.filename}
            onChange={e => updateFilename(e.target.value)}
            variant='standard'
          />
          <IconButton
            onClick={() => setIsFilesListVisible(prev => !prev)}
          >
            {isFilesListVisible ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        {isFilesListVisible && <Box className="files-list-box">
          <FilesList 
            files={allFiles}
            currFile={file}
            selectNewFile={selectNewFile}
          />
        </Box>}
      </Box>
      
      
      <Box className="editor-container">
        <TextEditor 
          file={file}
          onFileUpdate={onFileUpdate}
        />
      </Box>
    </Box>
    
  )
}

export default Post
