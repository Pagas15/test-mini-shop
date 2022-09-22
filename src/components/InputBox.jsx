import React from 'react'

const InputBox = ({state, changeState, title, validate = true, type = 'text', ...props}) => {

	const className = `inputBox ${!validate ? 'inputBox-error' : ''}`

	return (
		<label className={className}>
			<span className="inputBox__title">{title}</span>
			<input type={type} placeholder='Title' value={state} onChange={changeState} {...props} />
		</label>
	)
}

export default InputBox