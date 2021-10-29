import firebase from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyC44c6oM3-D_Nbuy_0-8HklT-hWesgvJzs',
	authDomain: 'offermarket-d6c31.firebaseapp.com',
	databaseURL: 'https://offermarket-d6c31-default-rtdb.firebaseio.com',
	projectId: 'offermarket-d6c31',
	storageBucket: 'offermarket-d6c31.appspot.com',
	messagingSenderId: '1082374728024',
	appId: '1:1082374728024:web:57222dd62fff4e88629d2d',
}

firebase.initializeApp(firebaseConfig)



export { firebase }
