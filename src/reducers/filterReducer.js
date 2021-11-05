import { types } from '../types/types';

const initialState = {
	category: null,
	minPrice: null,
	maxPrice: null,
	condition: null,
	location: null,
};

export const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.setFilter:
			return {
				...state,
				...action.payload,
			};
		case types.clearFilter:
			return initialState;
		default:
			return state;
	}
};
