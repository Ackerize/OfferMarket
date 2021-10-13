import React from 'react'
import { StyleSheet, SafeAreaView, Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import ProductList from '../components/Products/ProductList'

const Favorites = () => {
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Favoritos</Title>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ProductList />
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
		marginVertical: 10,
		color: '#191B32',
	},
})
