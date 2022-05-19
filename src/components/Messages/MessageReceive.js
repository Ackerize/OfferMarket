import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MessageReceive = ({ message, time }) => {
	return (
		<View style={styles.messageReceiveContainer}>
			<View style={styles.messageReceive}>
				<Text style={styles.messageReceiveContent}>{message}</Text>
				<View style={styles.timeContainer} />
				<View style={styles.viewTime}>
					<Text style={styles.receiveTime}>{time}</Text>
				</View>
			</View>
		</View>
	);
};

export default MessageReceive;

const styles = StyleSheet.create({
	messageReceiveContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginHorizontal: 15,
		marginVertical: 5,
	},
	messageReceive: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		alignItems: 'center',
		minWidth: '30%',
		maxWidth: '80%',
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 15,
		borderTopLeftRadius: 0,
	},
	messageReceiveContent: {
		color: '#000',
		fontSize: 16,
	},
	receiveTime: {
		fontSize: 13,
		paddingLeft: 10,
		color: '#B1B4C3',
		fontWeight: 'bold',
	},
	viewTime: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		height: '100%',
		position: 'absolute',
		right: 10,
		bottom: 7,
	},
	timeContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		height: '100%',
		width: 40,
	},
});
