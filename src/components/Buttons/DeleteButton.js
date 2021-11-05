import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import PropTypes from 'prop-types';

const DeleteButton = ({ onPress }) => {
	return (
		<Button
			mode="contained"
			icon={() => <Icon name="delete" size={20} color="#B71C1C" />}
			onPress={onPress}
			style={[styles.btnTop, styles.btnFavorite]}>
			<Text style={styles.btnFavoriteContent}>Eliminar</Text>
		</Button>
	);
};

export default DeleteButton;

const styles = StyleSheet.create({
	btnFavoriteContent: {
		color: '#B71C1C',
	},
	btnFavorite: {
		backgroundColor: '#FFCDD2',
	},
	btnTop: {
		position: 'absolute',
		right: 25,
		top: 30,
		display: 'flex',
		flexDirection: 'row',
		borderRadius: 10,
	},
});

DeleteButton.propTypes = {
    onPress: PropTypes.func.isRequired,
}
