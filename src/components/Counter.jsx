import React, { useCallback, useEffect, useState } from 'react'


const Counter = ({current, onChange}) => {
	const [count, setCount] = useState(current);

	const increment = () => {
		setCount(prev => ++prev)
	}
	const decrement = () => {
		if(count > 1){
			setCount(prev => --prev);
		}
	}

	useEffect(() => {
		onChange && onChange(count)
	}, [count])

	const classNameDecrement = count > 1 ? 'btn btn--red' : 'btn btn--disabled'

	return	<div className='counter'>
		<button className={classNameDecrement} onClick={decrement}>-</button>
		<div className="setCount__current">{count}</div>
		<button className="btn btn--green" onClick={increment}>+</button>
	</div>
}


export default Counter