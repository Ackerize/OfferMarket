import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProductCard from './ProductCard'

const ProductList = () => {
	return (
		<View style={styles.itemsContainer}>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
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
