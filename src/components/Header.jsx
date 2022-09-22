import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='header'>
			<Link to="/" className='header__btn' >Main</Link>
			<Link to="/create" className='header__btn' >Create</Link>
			<Link to="/cart" className='header__btn' >Cart</Link>
		</header>
	)
}

export default Header