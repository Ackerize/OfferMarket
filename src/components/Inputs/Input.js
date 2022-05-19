import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({
	label,
	type = 'default',
	value,
	mandatory = false,
	onBlur,
	onChangeText,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.labelContainer}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.mandatory}>{mandatory && '*'}</Text>
			</View>

			<TextInput
				keyboardType={type}
				onBlur={onBlur}
				onChangeText={onChangeText}
				selectionColor="#060948"
				style={styles.input}
				value={value}
			/>
		</View>
	);
};

export default Input;

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
	labelContainer: {
		flexDirection: 'row',
	},
	mandatory: {
		fontSize: 16,
		color: '#B71C1C',
		fontWeight: 'bold',
		marginLeft: 4,
		marginBottom: 10,
	}
});

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	mandatory: PropTypes.bool,
	onBlur: PropTypes.func,
	onChangeText: PropTypes.func,
};
