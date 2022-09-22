import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { LIMIT_CARDS_ON_PAGE } from '../utils/consts'
import { deleteCardItem, deleteCartItem, getListProducts, postAddCartItem, putEditCardItemInCart } from '../utils/scripts';


const MainPage = () => {
	const [listProducts, setListProducts] = useState([]);
	const [showList, setShowList] = useState([]);
	const [pagination, setPagination] = useState({
		activePage: 0,
		totalPage: 0,
	})
	const [sortValue, setSortValue] = useState('');

	const filterList = () => {
		const filter = listProducts.filter(item => item.title.toLowerCase().includes(sortValue));
		setShowList(filter)
		setPagination({
			activePage: 1,
			totalPage: Math.ceil(filter.length / LIMIT_CARDS_ON_PAGE),
		})
	}
	 
	useEffect(() => {
		getListProducts(setListProducts)
		return () => {}
	}, [])

	useEffect(filterList, [listProducts, sortValue])

	const listCardsBlock = showList && showList
		.slice(10 * pagination.activePage - 10, 10 * pagination.activePage)
		.map(item => {
			const deleteBtn = () => {
				deleteCardItem(item.id, deleteCartItem(item.id))
				getListProducts(setListProducts)
			}
			const addToCartBtn = (callback) => {
				postAddCartItem({
					id: item.id, 
					title: item.title,
					price: item.price,
					description: item.description,
				})
				putEditCardItemInCart({
					id: item.id, 
					inCartTo: 'add',
					callBack: elen => {
						elen && callback()
					}
				})
			}
			return <Card 
				cardId={item.id}
				title={item.title} 
				description={item.description} 
				price={item.price} 
				key={item.id} 
				btnDelete={deleteBtn}
				addToCartBtn={addToCartBtn}
				addToCart={item.inCart}
			/>
		}
	)

	const onChange = e => {
		setSortValue(e.target.value)
	}

	return (
		<div className='mainPage'>
			<div className="mainPage__top">
				<div className="inputBox">
					<input type="text" onChange={onChange} value={sortValue} />
					</div>
			</div>
			<div className="mainPage__cards">
				{listCardsBlock}
			</div>
			<div className="mainPage__paginate">
				{pagination?.totalPage > 1 &&  new Array(pagination.totalPage).fill(1).map((a, i) => {
					const num = ++i;
					const onClick = () => {
						setPagination({
							...pagination,
							activePage: num
						})
					}
					return <button key={num} onClick={onClick} className='btn' >{num}</button>
					
				}) }
			</div>
		</div>
	)
}

export default MainPage