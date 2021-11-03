import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	View,
	TextInput,
	ScrollView,
	Dimensions,
} from 'react-native';
import { Avatar, Text, Menu, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MessageReceive from '../components/Messages/MessageReceive';
import MessageSent from '../components/Messages/MessageSent';
import { showToast } from '../components/Modals/CustomToast';
import ModalRating from '../components/Modals/ModalRating';
import Spinner from '../components/Spinner';
import { API_HOST } from '../utils/constants';
import { firebase } from '../utils/firebase-config';

const windowHeight = Dimensions.get('window').height;

const PersonalChat = ({ navigation, route }) => {
	const idSeller = route?.params?.idSeller;
	const idBuyer = route?.params?.uid;
	const [visible, setVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [sellerProfile, setSellerProfile] = useState(null);
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState(null);

	const chatScrollRef = useRef();

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	// useEffect(() => {
	// 	chatScrollRef.current.scrollTo({ y: windowHeight });
	// }, []);

	useEffect(() => {
		const chatBuyer = firebase.database().ref(`/chats/${idBuyer}/${idSeller}`);
		chatBuyer.on('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				const dataArray = Object.entries(data).map(array => ({
					...array[1],
					idMessage: array[0],
				}));

				dataArray.forEach(message => {
					const { idMessage, read } = message;
					if (read === false) {
						firebase
							.database()
							.ref(`/chats/${idBuyer}/${idSeller}/${idMessage}`)
							.update({
								read: true,
							});
					}
				});

				setMessages(dataArray);
			} else {
				setMessages([]);
			}
		});
	}, []);

	useEffect(() => {
		axios.get(`${API_HOST}/profiles/${idSeller}`).then(({ data }) => {
			setSellerProfile(data.data);
		});
	}, []);

	const onSendMessage = () => {
		const message = {
			author: idBuyer,
			text: inputMessage,
			date: Date.now(),
			read: false,
		};
		setInputMessage('');
		firebase
			.database()
			.ref(`/chats/${idBuyer}/${idSeller}`)
			.push(message);
		firebase
			.database()
			.ref(`/chats/${idSeller}/${idBuyer}`)
			.push(message);
	};

	const onDeleteChat = () => {
		closeMenu();
		firebase
			.database()
			.ref(`/chats/${idBuyer}/${idSeller}`)
			.remove()
			.then(() => {
				showToast('success', 'Chat eliminado', 'Se eliminó el chat con éxito');
				navigation.navigate('Home');
			})
			.catch(() =>
				showToast('error', '¡Oh no!', 'Ocurrió un error. Inténtalo de nuevo'),
			);
	};

	if (!messages || !sellerProfile) return <Spinner />;

	const { photo, name } = sellerProfile;

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<View style={styles.contactInformation}>
					<Avatar.Image size={55} source={{ uri: photo }} />
					<Text style={styles.name}>{name}</Text>
				</View>
				<TouchableRipple onPress={openMenu} style={styles.touchable}>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={<Icon name="more-vert" color="#060948" size={30} />}>
						<Menu.Item
							onPress={() => {
								closeMenu();
								navigation.navigate('Profile');
							}}
							title="Ver perfil"
						/>
						<Menu.Item
							onPress={() => {
								setShowModal(true);
								closeMenu();
							}}
							title="Calificar usuario"
						/>
						<Menu.Item onPress={onDeleteChat} title="Borrar chat" />
					</Menu>
				</TouchableRipple>
			</View>
			<ModalRating visible={showModal} setVisible={setShowModal} />
			<ScrollView style={styles.chat} ref={chatScrollRef}>
				{messages && (
					<>
						<View style={styles.dateContainer}>
							<Text style={styles.date}>Hoy</Text>
						</View>
						{messages.map(message =>
							message.author === idBuyer ? (
								<MessageSent
									key={message.idMessage}
									message={message.text}
									time="11:00"
								/>
							) : (
								<MessageReceive
									key={message.idMessage}
									message={message.text}
									time="11:02"
								/>
							),
						)}
					</>
				)}
			</ScrollView>
			<View style={styles.input}>
				<TextInput
					style={styles.inputText}
					underlineColor="transparent"
					placeholder="Escribe un mensaje..."
					selectionColor="#060948"
					onChangeText={text => setInputMessage(text)}
					value={inputMessage}
				/>
				<TouchableRipple
					style={styles.sendButton}
					onPress={onSendMessage}
					borderless>
					<Icon name="send" size={30} color="#fff" />
				</TouchableRipple>
			</View>
		</SafeAreaView>
	);
};

export default PersonalChat;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#EBEDF1',
	},
	dots: {
		backgroundColor: 'red',
		width: 30,
		height: 50,
		marginRight: 30,
	},
	touchable: {
		marginRight: 5,
		padding: 8,
	},
	header: {
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingLeft: 80,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 75,
	},
	contactInformation: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%',
	},
	name: {
		fontSize: 20,
		paddingLeft: 20,
	},
	dateContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},
	date: {
		fontSize: 16,
		borderRadius: 10,
		backgroundColor: '#FFF',
		width: 70,
		height: 30,
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	chat: {
		maxHeight: windowHeight - 152,
		marginBottom: 85,
	},
	input: {
		position: 'absolute',
		bottom: 10,
		right: 0,
		left: 0,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingVertical: 7,
		marginHorizontal: 12,
		elevation: 1,
		height: 67,
	},
	sendButton: {
		backgroundColor: '#070A5D',
		borderRadius: 10,
		width: 50,
		height: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputText: {
		width: '80%',
		borderWidth: 0,
		borderColor: '#fff',
		paddingHorizontal: 0,
		fontSize: 18,
		color: '#060948',
		paddingRight: 15,
		paddingLeft: 5,
	},
});
