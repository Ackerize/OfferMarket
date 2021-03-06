import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Read from './Messages/Read';
import Received from './Messages/Received';
import Sent from './Messages/Sent';

const Person = ({
	title,
	subtitle,
	avatar,
	date,
	notifications,
	type = 'person',
	read = false,
	sent = false,
	action = () => console.log('click'),
}) => {
	return (
		<TouchableWithoutFeedback onPress={action}>
			<View style={styles.messageContainer}>
				<Avatar.Image size={60} source={{ uri: avatar }} />
				<View style={styles.informationContainer}>
					<Text style={styles.date}>{date}</Text>
					<Text numberOfLines={1} style={styles.person}>{title}</Text>
					<View style={styles.lastMessage}>
						{type === 'message' && (
							read ? <Read /> : sent ? <Sent color='#ABACAE' /> : <Received color='#ABACAE' />
						)}
						<Text numberOfLines={1} style={[styles.message, type === "message" && styles.typeMessage]}>
							{subtitle}
						</Text>
					</View>
					{notifications > 0 && (
						<Text style={styles.notificationText}>{notifications}</Text>
					)}
					<View style={styles.line} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Person;

const styles = StyleSheet.create({
	messageContainer: {
		flexDirection: 'row',
		marginHorizontal: 20,
		marginTop: 30,
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
		maxWidth: '75%',
	},
	message: {
		fontSize: 17,
		color: '#9D9D9D',
		lineHeight: 20,
		width: '80%',
	},
	typeMessage: {
		marginLeft: 5,
	},
	line: {
		height: 1,
		width: '95%',
		backgroundColor: '#DCE5EE',
		marginTop: 5,
		marginBottom: 5,
	},
	lastMessage: {
		flexDirection: 'row',
	},
});
