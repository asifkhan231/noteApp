import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const noteContext = createContext()

function NotesContext({ children }) {
    const [notes, setNotes] = useState([])

    const originUrl = 'http://localhost:3000/notes'


    const fetchNotes = async () => {
        const url = `${originUrl}/getNotes`

        try {
            const res = await axios.get(url)
            const data = await res.data

            setNotes(data?.notes)
        } catch (error) {
            console.log(error)
        }

    }

    const deleteNote = async (id) => {
        const url = `${originUrl}/delete/${id}`
        const res = await axios.delete(url)
        const data = await res.data

        await fetchNotes()
    }
    useEffect(() => {
        ((fetchNotes)())
    }, [])

    const createNote = async (e) => {
        e.preventDefault();
        try {

            let formData = new FormData(e.target);
            const title = formData.get('title')
            const short_desc = formData.get('desc')
            const content = formData.get('content')

            const url = `${originUrl}/create`
            const response = await axios.post(url, {
                title,
                short_desc,
                content
            })
            const data = await response.data
            console.log(data)
            await fetchNotes()

        } catch (error) {
            console.log(error)
        }
        finally {
            e.target.reset();
        }
    }

    const publishNote = async (id) => {
        const url = `${originUrl}/publish/${id}`
        try {
            const res = await axios.put(url)
            const data = await res.data
        } catch (error) {
            console.log(error)
        } finally {
            await fetchNotes()
        }

    }

    const updateNote = async (id, notedata) => {
        const url = `${originUrl}/update/${id}`
        try {
            const response = await axios.patch(url, notedata)
            const data = await response.data

            await fetchNotes()

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <noteContext.Provider value={{ notes, createNote, deleteNote, publishNote, updateNote }}>
            {children}
        </noteContext.Provider>
    )
}

export default NotesContext

export const useNotesContext = () => useContext(noteContext)