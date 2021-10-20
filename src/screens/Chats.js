import React from 'react'
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title, } from 'react-native-paper'
import avatarImg from '../assets/img/person.jpg'
import Person from '../components/Person'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const heightSize = Dimensions.get('window').height

const Chats = ({ navigation }) => {
	const action = () => navigation.navigate('PersonalChat')
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Mensajes</Title>
			<ScrollView style={styles.scrollView}>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 20 min"
					notifications={0}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 2 días"
					notifications={0}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 20 min"
					notifications={10}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 2 días"
					notifications={2}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 20 min"
					notifications={1}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 2 días"
					notifications={0}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 20 min"
					notifications={1}
					action={action}
				/>
				<Person
					avatar={avatarImg}
					title="Juan Gómez"
					subtitle="Ok, nos vemos a esa hora."
					date="Hace 2 días"
					notifications={0}
					action={action}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Chats

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 10,
		color: '#191B32',
	},
	scrollView: {
		maxHeight: heightSize - 150,
	},
})
