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
import { countUnreadMessages } from '../utils/utils';
import moment from 'moment';

const heightSize = Dimensions.get('window').height;

const Chats = ({ navigation }) => {
	const { uid } = useSelector(state => state.auth);

	const [chats, setChats] = useState(null);
	const [messages, setMessages] = useState({});

	useEffect(() => {
		firebase
			.database()
			.ref(`/chats/${uid}`)
			.on('value', snapshot => {
				const data = snapshot.val();
				if (data) {
					let aux = {};
					let dataUsers = [];
					const example = Object.entries(data);
					example.forEach(item => {
						const idUser = item[0];
						dataUsers = [...dataUsers, idUser];
						const dataUser = item[1];
						const dataMessages = Object.keys(dataUser);
						const lastDate = dataMessages[dataMessages.length - 1];
						const lastMessage = dataUser[lastDate];

						const lastest = Object.entries(lastMessage).map(item => ({
							date: lastDate,
							idMessage: item[0],
							message: item[1],
						}));

						aux = {
							...aux,
							[idUser]: lastest.reverse(),
						};
					});

					setMessages(aux);

					const profiles = dataUsers.map(async item => {
						const { photo, name, user } = await getProfile(item);
						return { photo, name, user };
					});

					Promise.all(profiles).then(values => {
						setChats(values);
					});
				} else {
					setChats([]);
				}
			});

		return () => {
			firebase
				.database()
				.ref(`/chats/${uid}`)
				.off();
		};
	}, []);

	const action = idSeller =>
		navigation.navigate('PersonalChat', {
			uid,
			idSeller,
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
				{chats.length > 0 &&
					chats.map(item => {
						const today = moment().format('DD/MM/YYYY');
						const {author, read, sent, text, time } = messages[item.user][0].message;
						const itemDate = messages[item.user][0].date.replace(/-/g, '/');
						
						return (
							<Person
								key={item.user}
								avatar={item.photo}
								title={item.name}
								subtitle={text}
								date={itemDate === today ? time  : itemDate}
								notifications={countUnreadMessages(messages[item.user], uid)}
								action={() => action(item.user)}
								type="message"
								read={author === uid ? read : false}
								sent={sent}
							/>
						)
					})}
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
