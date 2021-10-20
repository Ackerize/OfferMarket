import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title, Avatar, Text } from 'react-native-paper'
import avatarImg from '../assets/img/person.jpg'
import Person from '../components/Person'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const Notifications = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Notificaciones</Title>
			<ScrollView>
				<View style={styles.newNotiContainer}>
					<Person
						avatar={avatarImg}
						title="Juan Gómez"
						subtitle="Nuevo Producto."
						date="Hace 20 min"
						notifications={0}
					/>
				</View>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Oferta disponible."
					date="Hace 2 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Venta realizada con exíto."
					date="Hace 3 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Aaron Palacios"
					subtitle="Nuevo producto."
					date="10 de marzo"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Oferta disponible."
					date="Hace 2 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Venta realizada con exíto."
					date="Hace 3 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Aaron Palacios"
					subtitle="Nuevo producto."
					date="10 de marzo"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Oferta disponible."
					date="Hace 2 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Venta realizada con exíto."
					date="Hace 3 días"
					notifications={0}
				/>
				<Person
					avatar={avatarImg}
					title="Aaron Palacios"
					subtitle="Nuevo producto."
					date="10 de marzo"
					notifications={0}
				/>
			</ScrollView>
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
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 20,
		color: '#191B32',
	},
	newNotiContainer: {
		backgroundColor: '#F4F6FA',
		flexDirection: 'row',
		marginTop: 30,
		paddingBottom: 0,
		paddingRight: 40,
	},
})
