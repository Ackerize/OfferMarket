import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function createNewUser(user) {
	const { data } = await axios.post(`${API_HOST}/users`, user)
    return data
}
