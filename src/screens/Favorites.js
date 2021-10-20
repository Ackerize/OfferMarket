import React from 'react'
import { StyleSheet, SafeAreaView, Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import ProductCard from '../components/ProductCard'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const heightSize = Dimensions.get('window').height

const Favorites = () => {
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Favoritos</Title>
			<ScrollView style={styles.ScrollView}>
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
			</ScrollView>
		</SafeAreaView>
	)
}

export default Favorites

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginVertical: 20,
		color: '#191B32',
	},
	ScrollView: {
		maxHeight: heightSize - 150,
	},
	itemsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingBottom: 20,
	},
})
