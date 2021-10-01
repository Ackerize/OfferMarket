import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigation from './AppNavigation'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favorites'
import Chats from '../screens/Chats'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
const Stack = createStackNavigator()

export default function StackNavigation() {
	return (
		<Stack.Navigator>
			{/* <Stack.Screen
				name="Home"
				component={AppNavigation}
				options={{ headerTransparent: true, title: '' }}
			/> */}
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerTransparent: true, title: '', headerLeft: false }}
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
				name="Register"
				component={Register}
				options={{
					headerTransparent: true,
					title: '',
					headerBackImage: () => (
						<ArrowIcon name="arrow-back-ios" size={30} color="#000" />
					),
				}}
			/>
		</Stack.Navigator>
	)
}
