import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Person from '../components/Person';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { firebase } from '../utils/firebase-config';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import moment from 'moment';

const Notifications = ({ navigation, route }) => {
	const notis = route?.params?.notifications;

	const [notifications, setNotifications] = useState(notis.reverse());

	const { uid } = useSelector(state => state.auth);

	const handleOnPress = (idNotification, idProduct) => {
		const notif = notifications.filter(
			noti => noti.idNotification === idNotification,
		);
		if (!notif.read) {
			firebase
				.database()
				.ref(`notifications/${uid}/${idNotification}`)
				.update({
					read: true,
				});
			setNotifications(
				notifications.map(noti =>
					noti.id === idNotification ? { ...noti, read: true } : noti,
				),
			);
		}
		navigation.navigate('Detail', { id: idProduct });
	};

	if (!notifications)
		return (
			<SafeAreaView style={styles.container}>
				<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
				<Title style={[styles.title]}>Notificaciones</Title>
				<Spinner />
			</SafeAreaView>
		);

	if (notifications.length === 0)
		return (
			<>
				<SafeAreaView style={styles.container}>
					<FocusAwareStatusBar
						barStyle="dark-content"
						backgroundColor="white"
					/>
					<Title style={[styles.title]}>Notificaciones</Title>
					<Alert>No hay notificaciones</Alert>
				</SafeAreaView>
			</>
		);

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Notificaciones</Title>
			<ScrollView>
				{notifications.map((noti, index) => {
					const today = moment().format('DD/MM/YYYY');
					const newDate = moment(noti.date).format('DD/MM/YYYY');
					const time = moment(noti.date).format('HH:mm');
					return (
						<>
							{noti.read ? (
								<Person
									avatar={noti.seller.photo}
									title={noti.seller.name}
									subtitle={noti.message}
									date={today === newDate ? time : newDate}
									notifications={0}
									key={index}
									action={() => handleOnPress(noti.id, noti.product)}
								/>
							) : (
								<TouchableWithoutFeedback
									style={styles.newNotiContainer}
									onPress={() => handleOnPress(noti.id, noti.product)}>
									<Person
										avatar={noti.seller.photo}
										title={noti.seller.name}
										subtitle={noti.message}
										date={today === newDate ? time : newDate}
										notifications={0}
										key={index}
									/>
								</TouchableWithoutFeedback>
							)}
						</>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Notifications;

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
		marginBottom: 20,
	},
	newNotiContainer: {
		backgroundColor: '#F4F6FA',
		flexDirection: 'row',
		paddingBottom: 0,
		paddingRight: 40,
	},
});
