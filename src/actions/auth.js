import { types } from '../types/types'
import { firebase } from '../utils/firebase-config'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

export const startLoginEmailPassword = (email, password) => {
	return dispatch => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName, user.email))
			})
			.catch(e => {
				console.log(e)
			})
	}
}

export const startGoogleLogin = () => {
	console.log('clicked')
	return async dispatch => {
		const { idToken } = await GoogleSignin.signIn()

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken)

		// Sign-in the user with the credential
		auth()
			.signInWithCredential(googleCredential)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName, user.email, 'google'))
			})
			.catch(e => {
				console.log('ERROR')
				console.log(e)
			})
	}
}

export const startFacebookLogin = () => {
	return async dispatch => {
		LoginManager.logInWithPermissions([
			'public_profile',
			'email',
			'user_friends',
		])
			.then(result => {
				if (result.isCancelled) {
					console.log('Login cancelled')
				} else {
					AccessToken.getCurrentAccessToken()
						.then(data => {
							const facebookCredential = auth.FacebookAuthProvider.credential(
								data.accessToken,
							)
							auth()
								.signInWithCredential(facebookCredential)
								.then(({ user }) => {
									dispatch(
										login(user.uid, user.displayName, user.email, 'facebook'),
									)
								})
								.catch(e => {
									console.log(e)
								})
						})
						.catch(e => {
							console.log(e)
						})
				}
			})
			.catch(e => {
				console.log(e)
			})
	}
}

export const startRegisterWithEmailAndPassword = (
	email,
	password,
	displayName,
) => {
	return dispatch => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: displayName })
				dispatch(login(user.uid, user.displayName, user.email, 'email'))
			})
	}
}

export const login = (uid, displayName, email, typeLogin, photoURL) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email,
		typeLogin,
		photoURL
	},
})

export const startLogout = typeLogin => {
	return async dispatch => {
		switch (typeLogin) {
			case 'google':
				await GoogleSignin.revokeAccess()
			default:
				auth()
					.signOut()
					.then(() => dispatch(logout()))
				break
		}
	}
}

export const logout = () => ({
	type: types.logout,
})
