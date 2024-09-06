import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useNotesContext } from '../NotesContext'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateNote() {
    const { id } = useParams()
    const { updateNote, notes } = useNotesContext()
    const navigate = useNavigate()

    const note = notes.find(note => note._id === id)




    const [formData, setFormData] = useState({
        title: note ? note.title : '',
        short_desc: note ? note.short_desc : '',
        content: note ? note.content : ''
    })

    // Handle input changes
    const updatedData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (!note) {
        return <div>Note not found</div>
    }

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            updateNote(id, formData)
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            alert('note is updated')
        }

    }

    return (
        <>
            <div className="back__btn">
                <Button onClick={() => navigate('/')} variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
            </div>
            <div className="form update">
                <h2>Update Note</h2>
                <form onSubmit={submitHandler}>
                    <TextField
                        id="outlined-basic"
                        name='title'
                        onChange={updatedData}
                        value={formData.title}
                        label="Title"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-basic"
                        name='short_desc'
                        onChange={updatedData}
                        value={formData.short_desc}
                        label="Short Description"
                        variant="outlined"
                    />
                    <TextField
                        name='content'
                        id="outlined-multiline-static"
                        label="Content"
                        value={formData.content}
                        onChange={updatedData}
                        multiline
                        rows={4}
                    />

                    <Button type='submit' variant="contained" >Update</Button>
                </form>
            </div>
        </>
    )
}

export default UpdateNote
