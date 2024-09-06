import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material'
import { useNotesContext } from '../NotesContext'
import { Link } from 'react-router-dom'

function AllNotes() {
    const { notes, deleteNote, publishNote } = useNotesContext()

    const sortedNotes = [...notes].sort((a, b) => {
        // Use `updatedAt` if it exists, otherwise fallback to `createdAt`
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);

        return dateB - dateA; // Sort in descending order
    });
    return (
        <>
            <div className='notes__preview'>
                <h2>All Notes ({notes?.length})</h2>
                {notes && notes.length > 0 ? sortedNotes.map(note => (
                    <Card key={note._id}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {note.title}
                            </Typography>

                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> {note.short_desc}</Typography>


                            <Typography variant="body2" sx={{ fontSize: 15 }}>
                                {note.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color='error' size="small" onClick={() => deleteNote(note?._id)}>Delete</Button>
                            <Button color={note?.isPublish ? 'success' : 'error'} size="small" onClick={() => publishNote(note?._id)}>{note?.isPublish ? 'un-publish' : 'Publish'}</Button>
                            <Link to={`/update/${note?._id}`}><Button color='primary' size="small" >Update</Button></Link>
                        </CardActions>
                    </Card>
                )) : <p>currently, there are 0 notes</p>}
            </div>
        </>
    )
}

export default AllNotes
