import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Tag = ({ onPress, selected, name }) => {
	return (
		<Text
			style={[
				styles.category,
				selected && styles.categorySelec,
			]}
			onPress={onPress}>
			{name}
		</Text>
	)
}

export default Tag

const styles = StyleSheet.create({
    category: {
		marginHorizontal: 5,
		fontSize: 16,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		backgroundColor: '#fff',
		borderColor: '#E6E6E6',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
        color: '#000',
	},
	categorySelec: {
		backgroundColor: '#003C95',
		color: '#fff',
	},
})
