
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function AppHeader() {
	const [isVisible, setIsVisible] = useState()
	function toggleNavPreview(ev) {
		ev.stopPropagation()
		setIsVisible(prev => !prev)
	}

	useEffect(() => {
		document.addEventListener('click', onCloseModals)
		return () => {
			document.removeEventListener('click', onCloseModals)
		}
	})

	function onCloseModals() {
		setIsVisible(false)
	}

	const visibleClass = isVisible ? '' : 'hidden'
	return (
		<header className="app-header">
			<Link to="/">
				<img className="app-header-logo" src="img/header-logo.png" />
			</Link>
			<span title="Appsus apps" onClick={toggleNavPreview} className="app-header-hamburger ">
				<span className="material-symbols-outlined">apps</span>
				<nav className={`${visibleClass} header-apps`}>
					<NavLink className="home" title="Home" to="/">
						<img src="img/home_logo.svg" alt="home" />
					</NavLink>
					<NavLink className="mail" title="Mail" to="/mail/inbox">
						<img src="img/mail_logo.svg" alt="mail" />
					</NavLink>
					<NavLink className="note" title="Notes" to="/note">
						<img src="img/notes_logo.svg" alt="notes" />
					</NavLink>
					<NavLink className="book" title="Books" to="/book">
						<img src="img/books_logo.png" alt="books" />
					</NavLink>
				</nav>
			</span>
		</header>
	)
}
