import { GoogleMap } from '../../../cmps/GoogleMap'
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

import { useState, Fragment, useEffect, useRef } from 'react'
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
  useParams,
} from 'react-router-dom'

export function MailCompose() {
  const [searchParams, setSearchParams] = useSearchParams()
  // Get default when no intergartion~
  const [mailToEdit, setMailToEdit] = useState(
    mailService.getMailFromSearchParams(searchParams)
  )
  const [viewState, setViewState] = useState('normal') //'full-screen' or 'minimize'
  const [isLocation, setIsLocation] = useState(false)

  const timeoutRef = useRef()

  const navigate = useNavigate()
  const params = useParams()
  const { onAddMail } = useOutletContext()

  useEffect(() => {
    setSearchParams({ subject: mailToEdit.subject, body: mailToEdit.body })
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => {
      console.log('mail added?')
      onAddMail({ ...mailToEdit, isDraft: true })
    }, 5000)
  }, [mailToEdit])

  async function onSendMail(ev) {
    ev.preventDefault()
    if (!utilService.validateMail(mailToEdit.to)) {
      return showErrorMsg('Invalid Email Address!')
    }
    if (mailToEdit.isDraft) delete mailToEdit.isDraft
    const addedMail = await onAddMail(mailToEdit)
    setMailToEdit(addedMail)
  }

  function onChangeViewState(viewState, ev) {
    if (ev) ev.stopPropagation()
    setViewState(viewState)
  }

  async function handleChange({ target: { value, name, checked } }) {
    if (name === 'location') {
      setIsLocation(!isLocation)
      if (checked) {
        const { lat, lng } = await mailService.getUserLCordinates()
        setMailToEdit((prev) => ({ ...prev, lat, lng }))
      } else {
        const lat = null
        const lng = null
        setMailToEdit((prev) => ({ ...prev, lat, lng }))
      }
    } else setMailToEdit((prev) => ({ ...prev, [name]: value }))
  }

  console.log(mailToEdit)
  const { subject, body, to } = mailToEdit
  return (
    <Fragment>
      <section className={`${viewState} mail-compose`}>
        <header
          onClick={() => {
            onChangeViewState(viewState === 'minimize' ? 'normal' : 'minimize')
          }}
        >
          <h4>New Message</h4>
          <div className='icon-container'>
            {viewState !== 'minimize' && (
              <span
                onClick={(ev) => onChangeViewState('minimize', ev)}
                className='material-symbols-outlined'
              >
                minimize
              </span>
            )}
            {viewState === 'minimize' && (
              <span
                onClick={(ev) => onChangeViewState('normal', ev)}
                className='material-symbols-outlined'
              >
                add
              </span>
            )}
            {viewState !== 'full-screen' && (
              <span
                onClick={(ev) => onChangeViewState('full-screen', ev)}
                className='material-symbols-outlined'
              >
                open_in_full
              </span>
            )}
            {viewState === 'full-screen' && (
              <span
                onClick={(ev) => onChangeViewState('normal', ev)}
                className='material-symbols-outlined'
              >
                close_fullscreen
              </span>
            )}
            <span
              onClick={() => {
                navigate('/mail/' + params.folder)
              }}
              className='material-symbols-outlined'
            >
              close
            </span>
          </div>
        </header>
        <div className='form-container'>
          <form onSubmit={onSendMail}>
            <input
              value={to}
              onChange={handleChange}
              name='to'
              id='to'
              type='text'
              placeholder='To'
            />
            <input
              value={subject}
              onChange={handleChange}
              name='subject'
              id='subject'
              type='text'
              placeholder='Subject'
            />
            <textarea
              value={body}
              onChange={handleChange}
              name='body'
              id='body'
              type='text'
            />
            {mailToEdit.lat && mailToEdit.lng && (
              <GoogleMap lat={mailToEdit.lat} lng={mailToEdit.lng} />
            )}
            <div className='location'>
              <input
                type='checkbox'
                name='location'
                id='location'
                checked={isLocation}
                onChange={handleChange}
                // onChange={() => setIsLocation(!isLocation)}
              />
              <label htmlFor='location'>Add my Location</label>
            </div>
            <section className='tool-bar'>
              <button className='btn-send-mail'>Send</button>
            </section>
          </form>
        </div>
      </section>
      {viewState === 'full-screen' && (
        <div
          className='close-modal-screen'
          onClick={() => onChangeViewState('minimize')}
        ></div>
      )}
    </Fragment>
  )
}
