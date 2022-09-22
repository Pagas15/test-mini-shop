import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import { postCreateCardItem } from '../utils/scripts';

const CreatePage = () => {
	const navigate = useNavigate();
	const [values, setValue] = useState({
		title: '',
		price: '',
		description: '',
		titleValid: true,
		priceValid: true,
		descriptionValid: true,
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
	const onCreateBtn = () => {
		postCreateCardItem({
			title: values.title,
			price: values.price,
			description: values.description,
			callBack: elen => {
				elen && navigate('/')
			}
		})
	}

	return (
		<div className='createPage'>
			<InputBox state={values.title} changeState={onChangeTitle} title='Title' validate={values.titleValid} type='text' /> 
			<InputBox state={values.price} changeState={onChangePrice} title='Price' type='number' min="0" /> 
			<InputBox state={values.description} changeState={onChangeDescription} title='Description' type='text' /> 
			<button className="btn btn--green" onClick={onCreateBtn}>Save</button>
		</div>
	)
}

export default CreatePage