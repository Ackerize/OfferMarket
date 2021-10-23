import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import PropTypes from 'prop-types'

const Input = ({ label, type = 'default', value = "" }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label} </Text>
			<TextInput
				keyboardType={type}
				selectionColor="#060948"
				style={styles.input}
				value={value}
			/>
		</View>
	)
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
	input: {
		borderColor: '#E6E6E6',
		borderWidth: 2,
		borderRadius: 10,
		paddingVertical: 6,
		paddingHorizontal: 15,
		fontSize: 16,
	},
	label: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 10,
	},
})

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
}
