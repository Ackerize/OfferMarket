import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import PropTypes from 'prop-types'

const FavoriteButton = ({ isFavoriteProduct, onPress }) => {
	const iconFavorite = isFavoriteProduct ? 'favorite' : 'favorite-border';
	const colorFavorite = isFavoriteProduct ? '#B71C1C' : '#000';
	return (
		<Button
			mode="contained"
			icon={() => <Icon name={iconFavorite} size={20} color={colorFavorite} />}
			onPress={onPress}
			style={[
				styles.btnTop,
				isFavoriteProduct ? styles.btnFavorite : styles.btnNotFavorite,
			]}>
			<Text
				style={
					isFavoriteProduct
						? styles.btnFavoriteContent
						: styles.btnNotFavoriteContent
				}>
				{isFavoriteProduct ? 'Quitar' : 'Agregar'}
			</Text>
		</Button>
	);
};

export default FavoriteButton;

const styles = StyleSheet.create({
	btnNotFavoriteContent: {
		color: '#1F224D',
	},
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
	btnNotFavorite: {
		backgroundColor: '#F1F3F4',
	},
});

FavoriteButton.propTypes = {
    isFavoriteProduct: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
}
