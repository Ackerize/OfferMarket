import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProductCard from './ProductCard'

const ProductList = ({ navigation }) => {

	return (
		<View style={styles.itemsContainer}>
			<ProductCard navigation={navigation} />
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
			<ProductCard navigation={navigation}/>
		</View>
	)
}

export default ProductList

const styles = StyleSheet.create({
	itemsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingBottom: 100,
	},
})
