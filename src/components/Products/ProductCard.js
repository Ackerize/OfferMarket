import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;
const targetWidth = width / 2 - 25;

const ProductCard = ({ navigation, product }) => {
	console.log(product)
	const { _id, images, brand, name, price } = product;
	return (
		<View style={styles.container}>
			<Image source={{ uri: images[0] }} style={styles.image} />
			<View style={styles.infoContainer}>
				<Text numberOfLines={1} style={styles.title}>
					{name}
				</Text>
				{brand ? (
					<Text numberOfLines={1} style={styles.brand}>
						{brand}
					</Text>
				) : (
					<View style={{ height: 18, marginBottom: 2, }} />
				)}
				<Text style={styles.title}>$ {price.toFixed(2)}</Text>
				<TouchableRipple
					onPress={() => navigation.navigate('Detail', { id: _id })}
					style={styles.btn}
					borderless>
					<Icon name="chevron-right" size={30} color="#060948" />
				</TouchableRipple>
			</View>
		</View>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
		backgroundColor: '#EDEFF1',
		height: 190,
		width: targetWidth,
		maxWidth: 175,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginVertical: 10,
	},
	image: {
		width: 150,
		height: 80,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	infoContainer: {
		backgroundColor: '#fff',
		width: targetWidth - 20,
		maxWidth: 150,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		position: 'relative',
	},
	title: {
		color: '#060948',
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 3,
	},
	brand: {
		maxWidth: '70%',
		marginBottom: 2,
	},
	btn: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: '#F2F8FD',
		borderRadius: 5,
	},
	itemsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingBottom: 100,
	},
});
