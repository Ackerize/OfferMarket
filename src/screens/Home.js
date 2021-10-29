import { map } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Logo from '../assets/img/logo.svg'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import ProductList from '../components/Products/ProductList'
import Tag from '../components/Tag'
import { categories } from '../utils/category'
const heightSize = Dimensions.get('window').height

const Home = ({ navigation }) => {

	const state = useSelector(state => state);
	console.log(state)

	const [categorySelected, setCategorySelected] = useState(1)

	const onChangeCategory = category => {
		setCategorySelected(category)
	}

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<View style={styles.imgContainer}>
					<Logo width={150} height={150} fill="#000" />
				</View>

				<View>
					<View style={styles.notificationContainer}>
						<Text style={styles.notificationText}>1</Text>
						<IconButton
							raised
							icon="bell"
							color="#003C95"
							style={styles.notification}
							onPress={() => navigation.navigate('Notifications')}
						/>
					</View>
				</View>
			</View>
			<IconButton
				icon="magnify"
				style={styles.search}
				color="#003C95"
				onPress={() => navigation.navigate('Search')}
			/>

			<View style={styles.categories}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoryList}>
					{map(categories, catg => (
						<Tag
							key={catg.id}
							selected={categorySelected === catg.id}
							onPress={() => onChangeCategory(catg.id)}
							name={catg.name}
						/>
					))}
				</ScrollView>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.ScrollView}>
					<ProductList navigation={navigation}/>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height: '100%',
	},
	logout: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
	},
	imgContainer: {
		width: 50,
		height: 50,
		marginTop: -20,
		marginLeft: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: -10,
	},
	input: {
		height: 40,
		width: '90%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 10,
	},
	search: {
		height: 50,
		color: '#fff',
		width: '90%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		alignItems: 'flex-start',
		padding: 15,
		backgroundColor: '#fff',
		borderColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	notificationContainer: {
		position: 'relative',
		width: 60,
		height: 60,
		alignSelf: 'flex-end',
		marginBottom: 20,
		marginRight: 20,
		marginTop: 20,
	},
	notification: {
		height: 50,
		color: '#fff',
		width: 50,
		borderRadius: 10,
		fontSize: 18,
		backgroundColor: '#fff',
		borderColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	notificationText: {
		position: 'absolute',
		borderRadius: 100,
		backgroundColor: '#060948',
		fontWeight: 'bold',
		color: '#fff',
		height: 28,
		width: 28,
		textAlign: 'center',
		textAlignVertical: 'center',
		elevation: 6,
		right: -10,
		top: -10,
	},
	categories: {
		marginTop: 20,
		marginBottom: 50,
	},

	categoryList: {
		marginTop: 5,
		marginBottom: 15,
		marginHorizontal: 20,
	},

	ScrollView: {
		maxHeight: heightSize - 230,
	},
})
