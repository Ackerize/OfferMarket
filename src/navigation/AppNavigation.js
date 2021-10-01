import React from 'react'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Home from '../screens/Home'
import Chats from '../screens/Chats'
import Favorites from '../screens/Favorites'
import Profile from '../screens/Profile'

const Tabs = AnimatedTabBarNavigator()

const TabBarIcon = props => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}

export default () => {
	return (
		<Tabs.Navigator
			initialRouteName="Home	"
			tabBarOptions={{
				activeTintColor: '#FFFFFF',
				inactiveTintColor: '#191B32',
				activeBackgroundColor: '#003C95',
			}}
			appearance={{
				floating: true,
			}}>
			<Tabs.Screen
				name="Inicio"
				component={Home}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<TabBarIcon focused={focused} tintColor={color} name="home" />
					),
				}}
			/>
			<Tabs.Screen
				name="Favoritos"
				component={Favorites}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabBarIcon
							focused={focused}
							tintColor={color}
							name="favorite-outline"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Mensajes"
				component={Chats}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabBarIcon
							focused={focused}
							tintColor={color}
							name="chat-bubble-outline"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Perfil"
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<TabBarIcon focused={focused} tintColor={color} name="person" />
					),
				}}
			/>

			
		</Tabs.Navigator>
	)
}
