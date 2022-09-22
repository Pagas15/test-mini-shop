import React, { useEffect, useState } from 'react'
import { getListCart, deleteCartItem, putEditCardItemInCart, changeCurrentCart } from '../utils/scripts';
import Card from '../components/Card'

const CartPage = () => {
	const [cart, setCart] = useState([]);

	const totalSum = cart.reduce((a, b) => a + +b.price * +b.quantity, 0)

	useEffect(() => {
		getListCart(setCart)

		return () => {setCart([])}
	}, [])
	return (
		<div className="cartPage">
			<div className="cartPage__list">
			{
				cart && cart.map(cartItem => {
					const deleteBtn = () => {
						deleteCartItem(cartItem.id, putEditCardItemInCart({id: cartItem.id, inCartTo: 'remuve'}))
						getListCart(setCart)
					}
					const onChangeCurrent = (current) => {
						changeCurrentCart({
							id : cartItem.id,
							title : cartItem.title,
							price : cartItem.price,
							description : cartItem.description,
							current,
						})
						setCart([...cart.map(item => item.id === cartItem.id ? {...item, quantity: current} : item)])
					}

					return <Card 
						title={cartItem.title} 
						description={cartItem.description} 
						price={cartItem.price} 
						key={cartItem.id} 
						btnDelete={deleteBtn}
						counter={onChangeCurrent}
						current={cartItem.quantity}
					/>
				})
			}
			</div>
			<div className="cartPage__total">Total sum: {totalSum}</div>
		</div>
	)
}

export default CartPage