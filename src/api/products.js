import axios from 'axios';
import { API_HOST } from '../utils/constants';

export async function createNewProduct(product) {
	const { data } = await axios.post(`${API_HOST}/products`, product);
	return data;
}