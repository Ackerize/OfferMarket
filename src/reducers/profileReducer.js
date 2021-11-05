import { types } from '../types/types'

const initialState = {
	location: {
		latitude: null,
		longitude: null,
		name: null,
	},
	profileImage: null,
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.selectLocation:
			return {
				...state,
				location: { ...action.payload },
			}
		case types.selectPhoto:
			return {
				...state,
				profileImage: action.payload,
			}
		case types.clear:
			return initialState
		default:
			return state
	}
}
