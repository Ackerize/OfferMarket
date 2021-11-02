import axios from 'axios';
import { API_HOST } from '../utils/constants';

export async function createNewProfile(profile) {
	const { data } = await axios.post(`${API_HOST}/profiles`, profile);
	return data;
}

export async function updateProfile(profile, uid) {
	const { data } = await axios.put(`${API_HOST}/profiles/${uid}`, profile);
	return data;
}

export const getProfile = async uid => {
	const { data } = await axios.get(`${API_HOST}/profiles/${uid}`);
	return data.data;
};
