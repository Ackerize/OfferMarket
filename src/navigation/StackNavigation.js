import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppNavigation from './AppNavigation'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favorites'
import Chats from '../screens/Chats'
import PersonalChat from '../screens/PersonalChat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Form from '../screens/form'

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
			<Stack.Screen
				name="PersonalChat"
				component={PersonalChat}
				options={{
					headerTransparent: true,
					title: '',
					headerBackImage: () => <Icon name="arrow-back-ios" size={30} color="#000" style={{ paddingTop: 20, paddingLeft: 15}} />,
					headerRight: null
				}}
			/>
			<Stack.Screen
				name="FormProduct"
				component={Form}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<TabBarIcon focused={focused} tintColor={color} name="home" />
					),
					
				}}
			/>
		</Stack.Navigator>
	)
}
