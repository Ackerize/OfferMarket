import { useState } from 'react'

export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState)

	const reset = () => {
		setValues(initialState)
	}

	const handleInputChange = (name, value) => {
		setValues({
			...values,
			[name]: value.substring(2),
		})
	}

	return [values, handleInputChange, reset]
}
