import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigation from './AppNavigation'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favorites'
import Chats from '../screens/Chats'
import PersonalChat from '../screens/PersonalChat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Search from '../screens/Search'
import Notifications from '../screens/Notifications'
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'

const Stack = createStackNavigator()

export default function StackNavigation() {
	const [loggedIn, setLoggedIn] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName, user.email))
				setLoggedIn(true)
			} else {
				setLoggedIn(false)
			}
		})
	}, [])

	return (
		<Stack.Navigator initialRouteName="Home">
			{loggedIn ? (
				<>
					<Stack.Screen
						name="Home"
						component={AppNavigation}
						options={{ headerTransparent: true, title: '' }}
					/>
					<Stack.Screen
						name="Favorites"
						component={Favorites}
						options={{ headerTransparent: true, title: '' }}
					/>
					<Stack.Screen
						name="Chats"
						component={Chats}
						options={{ headerTransparent: true, title: '' }}
					/>
					<Stack.Screen
						name="PersonalChat"
						component={PersonalChat}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => (
								<Icon
									name="arrow-back-ios"
									size={30}
									color="#000"
									style={{ paddingTop: 20, paddingLeft: 15 }}
								/>
							),
							headerRight: null,
						}}
					/>
					<Stack.Screen
						name="Search"
						component={Search}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => (
								<Icon name="arrow-back-ios" size={30} color="#003C95" />
							),
						}}
					/>

					<Stack.Screen
						name="Notifications"
						component={Notifications}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => (
								<Icon name="arrow-back-ios" size={30} color="#003C95" />
							),
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Login"
						component={Login}
						options={{ headerTransparent: true, title: '', headerLeft: false }}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => (
								<Icon name="arrow-back-ios" size={30} color="#000" />
							),
						}}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}
