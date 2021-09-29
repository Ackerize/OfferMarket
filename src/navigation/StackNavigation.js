import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigation from './AppNavigation'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favorites'
import Chats from '../screens/Chats'

const Stack = createStackNavigator()

export default function StackNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={AppNavigation}
				options={{ headerTransparent: true, title: '' }}
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
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
		</Stack.Navigator>
	)
}
