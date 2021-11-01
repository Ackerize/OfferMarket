import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import Person from '../components/Person';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const Notifications = ({ navigation, route }) => {
	const notis = route?.params?.notifications;
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Notificaciones</Title>
			<ScrollView>
				{notis.map((noti, index) => (
					<>
						{noti.read ? (
							<Person
								avatar={noti.seller.photo}
								title={noti.seller.name}
								subtitle={noti.message}
								date="Hace 2 días"
								notifications={0}
								key={index}
							/>
						) : (
							<View style={styles.newNotiContainer}>
								<Person
									avatar={noti.seller.photo}
									title={noti.seller.name}
									subtitle={noti.message}
									date="Hace 20 min"
									notifications={0}
									key={index}
								/>
							</View>
						)}
					</>
				))}
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
