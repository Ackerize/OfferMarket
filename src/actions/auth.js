import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../utils/firebase-config'
//import { GoogleSignin } from '@react-native-community/google-signin'

export const startLoginEmailPassword = (email, password) => {

	return dispatch => {
		setTimeout(() => {
			dispatch(login(123, 'cristian', 'correo'))
		}, 3500)
	}
}

export const startGoogleLogin = async () => {
	console.log('clicked')
	return dispatch => {
		// const { idToken } =  GoogleSignin.signIn();
    // console.log(idToken);
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( userCred => {
        console.log(userCred);
      })
	}
}

export const login = (uid, displayName, email) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email,
	},
})
