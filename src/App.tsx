import './styles/app.css'
import { Box } from '@mui/material'
import TextEditor from './Editor'
import { useFiles } from './hooks/useFiles'
import { useDB } from './hooks/useDB';
import { getAllFilesFromDb, saveJsonToDb } from './lib/io';
import { DocumentData } from './types/document';
import { useEffect } from 'react';
import { FilesList } from './components/filesList';

function Post() {

  const {file, setFile, allFiles, setAllFiles} = useFiles();
  const {db} = useDB()

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
      saveJsonToDb(updatedFile, db)
    }
  }

  const selectNewFile = (newFile: DocumentData) => {
    setFile(newFile)
  }

  return (
    <Box className="app">
      {/* <div className="pulse"></div> */}
      <Box
        className="files-list-box"
      >
        <FilesList 
          files={allFiles}
          currFile={file}
          selectNewFile={selectNewFile}
        />
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
