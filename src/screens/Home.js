import { map } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { Searchbar, IconButton } from 'react-native-paper'
import Logo from '../assets/logo.svg'
import Form from '../screens/form'

const Home = ({ navigation }) => {
	const categories = [
		{
			id: 1,
			name: 'Reciente',
		},
		{
			id: 2,
			name: 'Hogar',
		},
		{
			id: 3,
			name: 'Belleza',
		},
		{
			id: 4,
			name: 'Ropa',
		},
		{
			id: 5,
			name: 'Telefonos',
		},
		{
			id: 6,
			name: 'Computadoras',
		},
	]

	const [categorySelected, setCategorySelected] = useState(1)

	const onChangeCategory = category => {
		setCategorySelected(category)
	}


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.imgContainer}>
					<Logo width={150} height={150} fill="#000" />
				</View>
				<View style={styles.notificationContainer}>
					<Text style={styles.notificationText}>10</Text>
					<IconButton
						raised
						icon="bell"
						color="#003C95"
						style={styles.notification}
					/>
				</View>
			</View>

			<Searchbar style={styles.input} />

			<View>
				<Form/>
				<IconButton
					onPress={() => this.props.navigation.navigate('')}
					icon="plus"
					color="#841584"

				/>
			</View>

			<View style={styles.categories}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoryList}>
					{map(categories, catg => (
						<Text
							key={catg.id}
							style={[
								styles.category,
								categorySelected === catg.id && styles.categorySelec,
							]}
							onPress={() => onChangeCategory(catg.id)}>
							{catg.name}
						</Text>
					))}
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
	},
	input: {
		height: 40,
		width: '90%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 10,
	},
	notificationContainer: {
		position: 'relative',
		width: 60,
		height: 60,
		alignSelf: 'flex-end',
		marginBottom: 40,
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
	category: {
		marginHorizontal: 5,
		fontSize: 16,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		backgroundColor: '#fff',
		borderColor: '#E6E6E6',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	categorySelec: {
		backgroundColor: '#003C95',
		color: '#fff',
	},
})
