import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

var width = Dimensions.get('window').width //full width of the screen

const ContactInfo = () => {
	return (
		<View style={styles.contactContainer}>
			<Text style={styles.item}>
				<Text style={styles.label}>Número de teléfono: </Text> 7259-8693
			</Text>
            <Text style={styles.item}>
				<Text style={styles.label}>Email: </Text> jhernandez@gmail.com
			</Text>
            <Text style={styles.item}>
				<Text style={styles.label}>Ubicación: </Text>
			</Text>
		</View>
	)
}

export default ContactInfo

const styles = StyleSheet.create({
	contactContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: width - 60,
	},
	label: {
		fontWeight: 'bold',
		color: '#060948',
	},
	item: {
		color: '#000000',
		fontSize: 15,
        marginTop: 10,
	},
})
