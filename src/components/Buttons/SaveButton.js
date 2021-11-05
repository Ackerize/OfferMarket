import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';

const SaveButton = ({ onPress, text, loading = false, disabled = false }) => {
	return (
		<Button
			mode="contained"
			style={styles.btn}
			onPress={onPress}
			loading={loading}>
			{text}
		</Button>
	);
};

export default SaveButton;

const styles = StyleSheet.create({
	btn: {
		width: '40%',
		alignSelf: 'center',
		marginTop: 20,
		paddingVertical: 2,
		backgroundColor: '#070B59',
		borderRadius: 10,
		color: '#fff',
	},
});

SaveButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
};
