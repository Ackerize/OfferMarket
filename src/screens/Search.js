import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { ScrollView } from 'react-native-gesture-handler'
import ProductList from '../components/Products/ProductList'

const Search = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<Searchbar style={styles.search} iconColor="#003C95" autoFocus={true} />
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.ScrollView}>
				<ProductList />
			</ScrollView>
		</SafeAreaView>
		
	)
}

export default Search

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
	},
	header: {
		paddingVertical: 3,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},

	search: {
		height: 50,
		width: '83%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 5,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
})
