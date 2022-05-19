import { types } from '../types/types';

export const setFilter = filter => ({
	type: types.setFilter,
	payload: {
		...filter,
	},
});

export const clearFilter = () => ({
	type: types.clearFilter,
});
