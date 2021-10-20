import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Laptop from '../assets/img/laptop.png'

const width = Dimensions.get('window').width
const targetWidth = width / 2 - 25

const ProductCard = () => {
	return (
		<View style={styles.container}>
			<Image source={Laptop} style={styles.image} />
			<View style={styles.infoContainer}>
				<Text numberOfLines={1} style={styles.title}>Zenbook Duo</Text>
				<Text>Asus</Text>
				<Text style={styles.title}>$720.00</Text>
				<TouchableRipple style={styles.btn}>
					<Icon name="chevron-right" size={30} color="#060948" />
				</TouchableRipple>
			</View>
		</View>
	)
}

export default ProductCard

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
        marginBottom: 5,
	},
	btn: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: '#F2F8FD',
		borderRadius: 5,
	},
})
