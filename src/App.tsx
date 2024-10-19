import { Box } from '@mui/material'
import './styles/app.css'
import TextEditor from './Editor'

function Post() {

  return (
    <Box className="app">
      {/* <div className="pulse"></div> */}
      <Box className="editor-container">
        <TextEditor />
      </Box>
    </Box>
    
  )
}

export default Post
