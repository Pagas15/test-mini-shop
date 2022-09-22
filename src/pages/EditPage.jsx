import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getCardProducts, putEditCardItem } from '../utils/scripts';

const EditPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [values, setValue] = useState({
		title: '',
		price: '',
		description: '',
		titleValid: '',
		priceValid: '',
		descriptionValid: '',
		inCart: false
	})

	const onChangeTitle = (e) => {
		setValue({...values, title: /[a-zA-Z0-9]/.test(e.target.value) ? e.target.value : values.title, titleValid: true}) 
	}
	const onChangePrice = (e) => {
		setValue({...values, price: /[0-9]/.test(e.target.value) ? e.target.value : values.price})
	}
	const onChangeDescription = (e) => {
		setValue({...values, description: /[a-zA-Z0-9]/.test(e.target.value) ? e.target.value : values.description})
	}

	useEffect(() => {
		getCardProducts({callBack: result => {
			setValue({
				...values,
				title: result.title,
				price: result.price,
				description: result.description,
				inCart: result.inCart
			})
		}, id})
		return () => {}
	}, [])

	
	const onUpdateBtn = () => {
		putEditCardItem({
			title: values.title,
			price: values.price,
			description: values.description,
			id,
			callBack: elen => {
				elen && navigate('/')
			}
		})
	}

	return (
		<div className='createPage'>
			<label className="inputBox">
				<span className="inputBox__title">Title</span>
				<input type="text" placeholder='Title' value={values.title} onChange={onChangeTitle} />
			</label>
			<label className="inputBox">
				<span className="inputBox__title">Price</span>
				<input type="number" placeholder='Price' value={values.price} onChange={onChangePrice} />
			</label>
			<label className="inputBox">
				<span className="inputBox__title">Description</span>
				<input type="text" placeholder='Description' value={values.description} onChange={onChangeDescription} />
			</label>
			<button className="btn btn--green" onClick={onUpdateBtn}>Save</button>
		</div>
	)
}

export default EditPage