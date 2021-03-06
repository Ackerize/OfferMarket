import { types } from '../types/types'

const initialState = {
	uid: null,
	name: null,
	email: null,
	typeLogin: null,
	hasProfile: false,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.login:
			return {
				...state,
				uid: action.payload.uid,
				name: action.payload.displayName,
				email: action.payload.email,
				typeLogin: action.payload.typeLogin,
				hasProfile: action.payload.hasProfile,
			}
		case types.logout:
			return {
				...state,
				uid: null,
				name: null,
				email: null,
				typeLogin: null,
				hasProfile: false,
			}
		case types.updateHasProfile:
			return {
				...state,
				hasProfile: true
			}
		default:
			return state
	}
}