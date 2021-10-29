import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function createNewProfile(profile) {
	const { data } = await axios.post(`${API_HOST}/profiles`, profile)
	return data
}

export const getProfile = async uid => {
	try {
		const { data } = await axios.get(`${API_HOST}/profiles/${uid}`)
		return data
	} catch ({ response: { data } }) {
		console.log(data)
		return data
	}
}
