import React from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
} from 'react-native'
import { Title, Avatar, Text } from 'react-native-paper'
import avatarImg from '../assets/img/person.jpg'

const Notifications = ( { navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Title style={styles.title}>Notificaciones</Title>
			<View style={styles.newNotiContainer}>
				<View style={styles.messageContainer}>
					<Avatar.Image size={60} source={avatarImg} />
					<View style={styles.informationContainer}>
						<Text style={styles.date}>hace 20 min</Text>
						<Text style={styles.person}>Fernando Portillo</Text>
						<Text style={styles.message}>Nuevo Producto.</Text>
						<View style={styles.line} />
					</View>
				</View>
			</View>
			<View style={styles.messageContainer}>
				<Avatar.Image size={60} source={avatarImg} />
				<View style={styles.informationContainer}>
					<Text style={styles.date}>hace 2 días</Text>
					<Text style={styles.person}>Juan Gómez</Text>
					<Text style={styles.message}>Oferta disponible.</Text>
					<View style={styles.line} />
				</View>
			</View>
			<View style={styles.messageContainer}>
				<Avatar.Image size={60} source={avatarImg} />
				<View style={styles.informationContainer}>
					<Text style={styles.date}>hace 3 días</Text>
					<Text style={styles.person}>Juan Gómez</Text>
					<Text style={styles.message}>Venta realizada con exíto.</Text>
					<View style={styles.line} />
				</View>
			</View>
			<View style={styles.messageContainer}>
				<Avatar.Image size={60} source={avatarImg} />
				<View style={styles.informationContainer}>
					<Text style={styles.date}>10 de marzo</Text>
					<Text style={styles.person}>Aaron Palacios</Text>
					<Text style={styles.message}>Nuevo producto.</Text>
					<View style={styles.line} />
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Notifications

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	line: {
		height: 1,
		width: '95%',
		backgroundColor: '#DCE5EE',
		marginTop: 5,
		marginBottom: 0,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 20,
		color: '#191B32',
	},
	messageContainer: {
		flexDirection: 'row',
		marginHorizontal: 20,
		marginTop: 30,
	},

    newNotiContainer: {
        backgroundColor: '#F4F6FA',
		flexDirection: 'row',
		marginTop: 30,
        paddingBottom: 0,
        paddingRight: 40,
	},

	informationContainer: {
		marginHorizontal: 20,
		height: 75,
		width: '80%',
		justifyContent: 'space-between',
		paddingTop: 5,
		position: 'relative',
	},
	notificationText: {
		position: 'absolute',
		borderRadius: 100,
		backgroundColor: '#060948',
		fontWeight: 'bold',
		color: '#fff',
		height: 24,
		width: 24,
		textAlign: 'center',
		textAlignVertical: 'center',
		right: 20,
		top: 30,
	},
	date: {
		position: 'absolute',
		color: '#9D9D9D',
		top: 0,
		right: 5,
	},
	person: {
		fontSize: 17,
		color: '#000',
		fontWeight: 'bold',
		lineHeight: 20,
	},
	message: {
		fontSize: 17,
		color: '#9D9D9D',
		lineHeight: 20,
	},
})