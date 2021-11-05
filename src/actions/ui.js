import { types } from '../types/types';

export const startLoading = () => ({
	type: types.startLoading,
});

export const finishLoading = () => ({
    type: types.finishLoading,
});