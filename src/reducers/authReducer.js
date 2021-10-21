import { types } from '../types/types'

const initialState = {
  uid: null,
  name: null,
  email: null,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.login:
			return {
        ...state,
				uid: action.payload.uid,
				name: action.payload.displayName,
				email: action.payload.email,
			}
		case types.logout:
			return {
				...state,
				uid: null,
				name: null,
				email: null,
			}

		default:
			return state
	}
}
