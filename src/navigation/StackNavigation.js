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
import { useDispatch } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import Detail from '../screens/Detail'

const Stack = createStackNavigator()

export default function StackNavigation() {
	const [loggedIn, setLoggedIn] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		auth().onAuthStateChanged(user => {
			if (user?.uid) {
				setLoggedIn(true)
			} else {
				setLoggedIn(false)
			}
		})
	}, [])

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'1082374728024-9nkb75rmoh9gilgl1g9nuhufd38iq5hn.apps.googleusercontent.com',
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
						name="Profile"
						component={Profile}
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
					<Stack.Screen
						name="Detail"
						component={Detail}
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
