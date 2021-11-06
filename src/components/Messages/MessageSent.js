import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Read from './Read';
import Sent from './Sent';
import Received from './Received';

const MessageSent = ({ message, time, read, sent }) => {
	return (
		<View style={[styles.messageSendContainer]}>
			<View style={styles.messageSend}>
				<Text style={styles.messageSendContent}>{message}</Text>
				<View style={styles.timeContainer} />
				<View style={styles.viewTime}>
					<Text style={styles.sendTime}>{time} </Text>
					{read ? <Read /> : sent ? <Sent /> : <Received />}
				</View>
			</View>
		</View>
	);
};

export default MessageSent;

const styles = StyleSheet.create({
	messageSendContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: 15,
		marginVertical: 5,
	},
	messageSend: {
		position: 'relative',
		backgroundColor: '#003C95',
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 15,
		borderTopRightRadius: 0,
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		alignItems: 'center',
		minWidth: '30%',
		maxWidth: '85%',
		height: '100%',
	},
	messageSendContent: {
		color: '#fff',
		fontSize: 16,
		maxWidth: '100%',
	},
	sendTime: {
		fontSize: 13,
		color: '#F2F8FD',
		textAlign: 'right',
		paddingLeft: 20,
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
		width: 65,
	},
});

MessageSent.propTypes = {
	message: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
};
