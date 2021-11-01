import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Alert from '../Alert';
import Spinner from '../Spinner';
import ProductCard from './ProductCard';

const ProductList = ({ navigation, data }) => {
	if (!data)
		return (
			<View style={styles.spinnerContainer}>
				<Spinner />
			</View>
		);

	if (data.length === 0) return <Alert>No se encontraron productos</Alert>;

	return (
		<View style={styles.itemsContainer}>
			{data.map((product, index) => (
				<ProductCard
					key={index}
					product={product}
					navigation={navigation}
				/>
			))}
		</View>
	);
};

export default ProductList;

const styles = StyleSheet.create({
	spinnerContainer: {
		marginTop: 20,
	},
	itemsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingBottom: 100,
	},
});
