import { Route, useRouteMatch } from 'react-router-dom'
import NotesList from './NoteList'
import Note from './Note'
import NoteEdit from './NoteEdit'

const NotesRouter = () => {
  const match = useRouteMatch()

  return (
    <>
      <Route path={`${match.url}/`} exact>
        <NotesList />
      </Route>
      <Route path={`${match.url}/add`}>
        <Note />
      </Route>
      <Route path={`${match.url}/edit/:id`}>
        <NoteEdit />
      </Route>
    </>
  )
}

export default NotesRouter
