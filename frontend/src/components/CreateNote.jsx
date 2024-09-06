import React from 'react'
import { TextField, Button } from '@mui/material'
import axios, { Axios } from 'axios'
import { useNotesContext } from '../NotesContext'

function CreateNote() {
const {createNote} = useNotesContext()
   
    return (
            <div className="form">
                <h2>Create Note</h2>
                <form onSubmit={createNote}>
                    <TextField id="outlined-basic" name='title' label="Title" variant="outlined" />
                    <TextField id="outlined-basic" name='desc' label="Short_desc" variant="outlined" />
                    <TextField
                        name='content'
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4} />

                    <Button type='submit' variant="contained">Submit</Button>
                </form>
            </div>
    )
}

export default CreateNote
