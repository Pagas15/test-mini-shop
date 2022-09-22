import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/CartPage'
import CreatePage from '../pages/CreatePage'
import EditPage from '../pages/EditPage'
import MainPage from '../pages/MainPage'
const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/create' element={<CreatePage />} />
			<Route path='/edit/:id' element={<EditPage />} />
			<Route path='/cart' element={<CartPage />} />
		</Routes>
	)
}

export default AppRouter