import React from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	TouchableWithoutFeedback,
} from 'react-native'
import { Title, Avatar, Text } from 'react-native-paper'

const Person = ({ title, subtitle, avatar, date, notifications, action = () => console.log('click') }) => {
	return (
		<TouchableWithoutFeedback
			onPress={action}>
			<View style={styles.messageContainer}>
				<Avatar.Image size={60} source={avatar} />
				<View style={styles.informationContainer}>
					<Text style={styles.date}>{date}</Text>
					<Text style={styles.person}>{title}</Text>
					<Text style={styles.message}>{subtitle}</Text>
					{notifications > 0 && <Text style={styles.notificationText}>10</Text>}
					<View style={styles.line} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Person

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
	},
	message: {
		fontSize: 17,
		color: '#9D9D9D',
		lineHeight: 20,
	},
	line: {
		height: 1,
		width: '95%',
		backgroundColor: '#DCE5EE',
		marginTop: 5,
		marginBottom: 5,
	},
})
