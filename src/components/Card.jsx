import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Counter from './Counter';


const Card = ({
		title, 
		price, 
		description, 
		btnDelete = null, 
		cardId = null, 
		addToCart = false, 
		addToCartBtn = false, 
		counter = false,
		current = 1,
	}) => {

	const [stateBtn, setStateBtn] = useState(addToCart)

	const classNameForAddToCart = stateBtn ? 'btn btn--disabled' : 'btn btn--green';
	const onClick = !(stateBtn) ? () => {addToCartBtn(() => {setStateBtn(true)})} : () => {};
	
	return (
		<div className='cart'>
			<p className="cart__title">{title}</p>
			<p className="cart__price">{price}</p>
			<p className="cart__description">{description}</p>
			{cardId && <Link to={`/edit/${cardId}`} className="btn btn--gray">Edit</Link>}
			{btnDelete && <button className="btn btn--red" onClick={btnDelete}>Delete</button>}
			{counter && <Counter current={current} onChange={counter} />}
			{addToCartBtn && <button className={classNameForAddToCart} onClick={onClick} >Add to cart</button>}
		</div>
	)
}

export default Card