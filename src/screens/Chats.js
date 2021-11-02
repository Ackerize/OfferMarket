import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Person from '../components/Person';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { API_HOST } from '../utils/constants';
import { firebase } from '../utils/firebase-config';
import { useSelector } from 'react-redux';
import { getProfile } from '../api/profiles';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const heightSize = Dimensions.get('window').height;

const Chats = ({ navigation }) => {
	const { uid } = useSelector(state => state.auth);

	const [chats, setChats] = useState(null);

	useEffect(() => {
		firebase
			.database()
			.ref(`/chats/${uid}`)
			.on('value', snapshot => {
				const data = snapshot.val();
				if (data) {
					const dataArray = Object.entries(data).map(array => ({
						...array[1],
						idUser: array[0],
					}));

					const profiles = dataArray.map(async item => {
						const { photo, name, user } = await getProfile(item.idUser);
						return { photo, name, user };
					});

					Promise.all(profiles).then(values => {
						setChats(values);
					});
				} else {
					setChats([]);
				}
			});
	}, []);

	const action = (idSeller) => navigation.navigate('PersonalChat', {
		uid,
		idSeller
	});

	if (!chats) {
		return (
			<SafeAreaView style={styles.container}>
				<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
				<Title style={styles.title}>Mensajes</Title>
				<Spinner />
			</SafeAreaView>
		);
	}
	if (chats.length === 0) {
		return (
			<SafeAreaView style={styles.container}>
				<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
				<Title style={styles.title}>Mensajes</Title>
				<Alert>No hay mensajes</Alert>
			</SafeAreaView>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Mensajes</Title>
			<ScrollView style={styles.scrollView}>
				{chats.map(item => (
					<Person
						avatar={item.photo}
						title={item.name}
						subtitle="Ok, nos vemos a esa hora."
						date="Hace 20 min"
						notifications={0}
						action={() => action(item.user)}
					/>
				))}
				{/* <Person
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
				/> */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Chats;

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
});
