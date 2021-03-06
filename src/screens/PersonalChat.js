import axios from 'axios';
import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	View,
	TextInput,
	ScrollView,
	Dimensions,
	Keyboard,
} from 'react-native';
import { Avatar, Text, Menu, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MessageReceive from '../components/Messages/MessageReceive';
import MessageSent from '../components/Messages/MessageSent';
import ConfirmModal from '../components/Modals/ConfirmModal';
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
	const [dates, setDates] = useState([]);
	const [idMessageSent, setIdMessageSent] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [visibleModal, setVisibleModal] = useState(false);
	const [confirm, setConfirm] = useState(false);

	const chatScrollRef = useRef();

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	useEffect(() => {
		const chatBuyer = firebase.database().ref(`/chats/${idBuyer}/${idSeller}`);
		chatBuyer.on('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				let messagesArray = {};
				Object.entries(data).forEach(array => {
					const [key, value] = array;
					const arrayMessage = Object.entries(value).map(message => {
						const [idMessage, valueMessage] = message;
						const { read, author } = valueMessage;
						if (author !== idBuyer && read === false) {
							firebase
								.database()
								.ref(`/chats/${idBuyer}/${idSeller}/${key}/${idMessage}`)
								.update({
									read: true,
								});
						}
						return {
							...message[1],
							idMessage: message[0],
						};
					});

					messagesArray = {
						...messagesArray,
						[key]: arrayMessage,
					};
				});

				setDates(Object.keys(messagesArray));
				setMessages(messagesArray);
			} else {
				setMessages([]);
			}
		});

		return () => {
			chatBuyer.off();
		};
	}, []);

	useEffect(() => {
		const chatSeller = firebase.database().ref(`/chats/${idSeller}/${idBuyer}`);
		chatSeller.on('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				Object.entries(data).forEach(array => {
					const [key, value] = array;
					Object.entries(value).forEach(message => {
						const [idMessage, valueMessage] = message;
						const { read, author } = valueMessage;
						if (author !== idBuyer && read === false) {
							firebase
								.database()
								.ref(`/chats/${idSeller}/${idBuyer}/${key}/${idMessage}`)
								.update({
									read: true,
								});
						}
					});
				});
			}
		});

		return () => {
			chatSeller.off();
		};
	}, []);

	useEffect(() => {
		axios.get(`${API_HOST}/profiles/${idSeller}`).then(({ data }) => {
			setSellerProfile(data.data);
			showLastMessage();
		});
	}, []);

	const date = moment().format('DD-MM-YYYY');

	useEffect(() => {
		if (!isLoading) {
			firebase
				.database()
				.ref(`/chats/${idBuyer}/${idSeller}/${date}/${idMessageSent}`)
				.update({
					sent: false,
				});
		}
	}, [isLoading]);

	useEffect(() => {
		showLastMessage();
	}, [messages]);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', showLastMessage);

		return () => {
			Keyboard.removeListener('keyboardDidShow', showLastMessage);
		};
	}, []);

	const showLastMessage = () => {
		if (chatScrollRef.current) {
			chatScrollRef.current.scrollToEnd({ animated: true });
		}
	};

	const onSendMessage = () => {
		const message = {
			author: idBuyer,
			text: inputMessage,
			time: moment().format('HH:mm'),
			read: false,
			sent: true,
			datetime: Date.now(),
		};
		setInputMessage('');
		setIsLoading(true);
		firebase
			.database()
			.ref(`/chats/${idBuyer}/${idSeller}/${date}`)
			.push(message)
			.then(url => {
				const idMessage = String(url)
					.split('/')
					.pop();

				setIdMessageSent(idMessage);
			});
		firebase
			.database()
			.ref(`/chats/${idSeller}/${idBuyer}/${date}`)
			.push(message)
			.then(url => {
				const idMessage = String(url)
					.split('/')
					.pop();
				firebase
					.database()
					.ref(`/chats/${idSeller}/${idBuyer}/${date}/${idMessage}`)
					.update({
						sent: false,
					});
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (confirm) {
			
			setMessages(null);
			firebase
				.database()
				.ref(`/chats/${idBuyer}/${idSeller}`)
				.remove()
				.then(() => {
					showToast(
						'success',
						'Chat eliminado',
						'Se elimin?? el chat con ??xito',
					);
					navigation.goBack();
				})
				.catch(() =>
					showToast('error', '??Oh no!', 'Ocurri?? un error. Int??ntalo de nuevo'),
				);
		}
	}, [confirm]);

	const onDeleteChat = () => {
		closeMenu();
		setVisibleModal(true);
	};

	if (!messages || !sellerProfile) return <Spinner />;

	const { photo, name } = sellerProfile;

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<ConfirmModal
				visible={visibleModal}
				setVisible={setVisibleModal}
				setConfirm={setConfirm}
				title="??Desea borrar la conversaci??n?"
			/>
			<View style={styles.header}>
				<View style={styles.contactInformation}>
					<Avatar.Image size={55} source={{ uri: photo }} />
					<Text numberOfLines={1} style={styles.name}>
						{name}
					</Text>
				</View>
				<TouchableRipple onPress={openMenu} style={styles.touchable}>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={<Icon name="more-vert" color="#060948" size={30} />}>
						<Menu.Item
							onPress={() => {
								closeMenu();
								navigation.navigate('Profile', {
									idProfile: idSeller,
								});
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
			<ModalRating
				visible={showModal}
				setVisible={setShowModal}
				seller={idSeller}
			/>
			<ScrollView style={styles.chat} ref={chatScrollRef}>
				{messages && (
					<>
						{dates.map(date => {
							const formatDay = date.replace(/-/g, '/');
							const today = moment().format('DD/MM/YYYY');
							return (
								<>
									<View style={styles.dateContainer} key={date}>
										<Text style={styles.date} key={date + 'TAG'}>
											{formatDay === today ? 'Hoy' : formatDay}
										</Text>
									</View>
									{messages[date]?.map(message =>
										message.author === idBuyer ? (
											<MessageSent
												key={message.idMessage}
												message={message.text}
												time={message.time}
												read={message.read}
												sent={message.sent}
											/>
										) : (
											<MessageReceive
												key={message.idMessage}
												message={message.text}
												time={message.time}
											/>
										),
									)}
								</>
							);
						})}
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
		backgroundColor: '#7A98C5',
		height: 30,
		textAlignVertical: 'center',
		textAlign: 'center',
		paddingHorizontal: 10,
		fontWeight: 'bold',
		color: '#fff',
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
