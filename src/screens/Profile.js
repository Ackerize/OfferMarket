import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Dimensions,
} from 'react-native'
import { Title, Avatar, Button } from 'react-native-paper'
import { AirbnbRating } from 'react-native-elements'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import avatarImg from '../assets/img/person.jpg'
import { ScrollView } from 'react-native-gesture-handler'
import ProductList from '../components/ProductList'

const heightScreen = Dimensions.get('window').height

const Profile = () => {
	const [activeTab, setActiveTab] = useState('products')

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Perfil</Title>
			<View style={styles.header}>
				<Avatar.Image size={75} source={avatarImg} />
				<Text style={styles.name}>Juan Hernández</Text>
				<View style={styles.ratingContainer}>
					<Text style={styles.countStar}>4.0</Text>
					<AirbnbRating
						showRating={false}
						defaultRating={4}
						onFinishRating={console.log}
						starContainerStyle={styles.rating}
						isDisabled={true}
						starStyle={styles.star}
					/>
				</View>
				<View style={styles.btnContainer}>
					<Button
						mode="contained"
						style={styles.btnPrimary}
						onPress={() => console.log('Click')}>
						<Text style={[styles.btnText, styles.btnPrimaryText]}>
							Nuevo producto
						</Text>
					</Button>
					<Button
						mode="contained"
						style={styles.btnSecundary}
						onPress={() => console.log('Click')}>
						<Text style={[styles.btnText, styles.btnSecundaryText]}>
							Editar perfil
						</Text>
					</Button>
				</View>
				<View style={styles.customTabs}>
					<TouchableWithoutFeedback onPress={() => setActiveTab('products')}>
						<Text
							style={[styles.tab, activeTab == 'products' && styles.activeTab]}>
							Productos
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => setActiveTab('location')}>
						<Text
							style={[styles.tab, activeTab == 'location' && styles.activeTab]}>
							Ubicación
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => setActiveTab('reviews')}>
						<Text
							style={[styles.tab, activeTab == 'reviews' && styles.activeTab]}>
							Reseñas
						</Text>
					</TouchableWithoutFeedback>
				</View>
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}>
					{activeTab == 'products' && <ProductList />}
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginVertical: 10,
		color: '#191B32',
	},
	header: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	name: {
		fontSize: 18,
		marginTop: 10,
		color: '#060948',
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	star: {
		width: 20,
		height: 20,
	},
	countStar: {
		fontSize: 15,
		color: '#060948',
		marginRight: 15,
		fontWeight: 'bold',
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: '80%',
	},
	btnPrimary: {
		backgroundColor: '#060948',
		borderRadius: 10,
	},
	btnSecundary: {
		backgroundColor: '#F1F3F4',
		borderRadius: 10,
	},
	btnText: {
		fontSize: 12,
	},

	btnPrimaryText: {
		color: 'white',
	},
	btnSecundaryText: {
		color: '#1F224D',
	},
	customTabs: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 30,
		width: '70%',
	},
	tab: {
		fontSize: 15,
		color: '#A6A7B2',
	},
	activeTab: {
		color: '#060948',
		fontWeight: 'bold',
		borderBottomColor: '#060948',
		borderBottomWidth: 2,
	},
	scrollView: {
		maxHeight: heightScreen - 325,
		marginTop: 20,
	},
})
