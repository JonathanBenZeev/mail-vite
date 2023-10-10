import './assets/css/main.css'
// const { Route, Routes } = ReactRouterDOM
// import { Router, Route, Routes } from 'react-router-dom'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
// const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header'
import { Home } from './views/home'
import { MailIndex } from './apps/mail/views/mail-index'
import { MailCompose } from './apps/mail/cmps/mail-compose'
import { UserMsg } from './cmps/user-msg'
// import { BookAddFromGoogle } from './apps/book/cmps/book-add-google.jsx'
import { MailDetails } from './apps/mail/cmps/mail-details'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mail/:folder' element={<MailIndex />}>
            <Route
              path='/mail/:folder/details/:mailId'
              element={<MailDetails />}
            />
            <Route path='/mail/:folder/compose' element={<MailCompose />} />
          </Route>

          {/* <Route path="/note" element={<NoteIndex />} /> */}
          {/* 
					<Route path="/book" element={<BookIndex />} />
					<Route path="/book/:bookId" element={<BookDetails />} />
					<Route path="/book/edit/:bookId" element={<BookEdit />} />
					<Route path="/book/edit" element={<BookEdit />} />
					<Route path="/book/:bookId/review" element={<AddReview />} />
					<Route path="/book/:bookId/review/:reviewId" element={<ReviewPreview />} /> */}

          {/* <Route path="/book/add-from-google" element={<BookAddFromGoogle />} /> */}
        </Routes>
      </section>
      <UserMsg />
    </Router>
  )
}
