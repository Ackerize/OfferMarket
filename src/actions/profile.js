import { types } from '../types/types'

export const selectLocation = information => ({
	type: types.selectLocation,
	payload: {
		latitude: information?.lat || information?.latitude,
		longitude: information?.lng || information?.longitude,
		name: information.name,
	},
})

export const selectPhoto = photo => ({
	type: types.selectPhoto,
	payload: photo,
});

export const clear = () => ({
	type: types.clear,
});
