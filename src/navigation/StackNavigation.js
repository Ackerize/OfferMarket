import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from './AppNavigation';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import Chats from '../screens/Chats';
import PersonalChat from '../screens/PersonalChat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Filter from '../screens/Filter';
import ProfileForm from '../screens/ProfileForm';
import ProductForm from '../screens/ProductForm';
import SearchLocation from '../screens/SearchLocation';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function StackNavigation() {
	const { uid, hasProfile } = useSelector(state => state.auth);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'1082374728024-9nkb75rmoh9gilgl1g9nuhufd38iq5hn.apps.googleusercontent.com',
		});
	}, []);

	const buttonLeft = () => (
		<Icon
			name="arrow-back-ios"
			size={30}
			color="#000"
			style={{ paddingLeft: 15 }}
		/>
	);
	return (
		<Stack.Navigator>
			{!uid ? (
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
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
				</>
			) : (
				<>
					{hasProfile ? (
						<>
							<Stack.Screen
								name="Home"
								component={AppNavigation}
								options={{ headerTransparent: true, title: '' }}
							/>
							<Stack.Screen
								name="ProfileForm"
								component={ProfileForm}
								options={({ route }) => ({
									title: route?.params?.name || 'Crear perfil',
									headerTitleAlign: 'center',
									headerTitleStyle: {
										fontSize: 22,
									},
									headerBackImage: () => buttonLeft(),
									headerRight: null,
								})}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name="ProfileForm"
								component={ProfileForm}
								options={({ route }) => ({
									title: route?.params?.name || 'Crear perfil',
									headerTitleAlign: 'center',
									headerTitleStyle: {
										fontSize: 22,
									},
									headerBackImage: () => buttonLeft(),
									headerRight: null,
								})}
							/>
							<Stack.Screen
								name="Home"
								component={AppNavigation}
								options={{ headerTransparent: true, title: '' }}
							/>
						</>
					)}

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
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
					<Stack.Screen
						name="SearchLocation"
						component={SearchLocation}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
					<Stack.Screen
						name="ProductForm"
						component={ProductForm}
						options={({ route }) => ({
							title: route.params.name,
							headerTitleAlign: 'center',
							headerTitleStyle: {
								fontSize: 22,
							},
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						})}
					/>
					<Stack.Screen
						name="Filter"
						component={Filter}
						options={{
							headerTransparent: true,
							title: 'Filtros',
							headerTitleAlign: 'center',
							headerTitleStyle: {
								fontSize: 22,
							},
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
					<Stack.Screen
						name="PersonalChat"
						component={PersonalChat}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
					<Stack.Screen
						name="Search"
						component={Search}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>

					<Stack.Screen
						name="Notifications"
						component={Notifications}
						options={{
							headerTransparent: true,
							title: '',
							headerBackImage: () => buttonLeft(),
							headerRight: null,
						}}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
