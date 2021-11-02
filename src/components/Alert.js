import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Alert = ({ children }) => {
	return <Text style={styles.text}>{ children }</Text>;
};

export default Alert;

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		marginTop: 20,
		textAlign: 'center',
	},
});
