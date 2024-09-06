import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NotesContext, { noteContext } from './NotesContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateNote from './components/UpdateNote.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/update/:id',
    Component: UpdateNote,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesContext>
      {/* <App /> */}
      <RouterProvider router={routes} />
    </NotesContext>
  </StrictMode>,
)
