import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/img/logo.svg';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ProductList from '../components/Products/ProductList';
import Tag from '../components/Tag';
import { categories } from '../utils/category';
import { useIsFocused } from '@react-navigation/native';
import { showToast } from '../components/Modals/CustomToast';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
import { firebase } from '../utils/firebase-config';
import { clear } from '../actions/profile';

const heightSize = Dimensions.get('window').height;

const Home = ({ navigation }) => {
	const isFocused = useIsFocused();
	const { uid } = useSelector(state => state.auth);

	const dispatch = useDispatch();

	const [categorySelected, setCategorySelected] = useState(1);
	const [productData, setProductData] = useState(null);

	const [totalNotification, setTotalNotification] = useState(0);
	const [notifications, setNotifications] = useState(null);

	const onChangeCategory = category => {
		setCategorySelected(category);
	};

	useEffect(() => {
		if (isFocused) {
			const catSelected = categories.find(c => c.id === categorySelected);
			const URL =
				catSelected.name !== 'Reciente'
					? `${API_HOST}/products?category=${catSelected.name}`
					: `${API_HOST}/products`;
			axios
				.get(URL)
				.then(({ data }) => {
					const { error, message, products } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						setProductData(products);
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					}
				});
		}
	}, [isFocused, categorySelected]);

	useEffect(() => {
		const notifications = firebase.database().ref(`/notifications/${uid}`);
		notifications.on('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				const dataArray = Object.entries(data).map(array => ({
					...array[1],
					id: array[0],
				}));
				const unreadNotifications = dataArray.filter(
					item => item.read === false,
				);
				setNotifications(dataArray);
				setTotalNotification(unreadNotifications.length);
			} else {
				setNotifications([]);
			}
		});

		return () => {
			notifications.off();
		};
	}, []);

	useEffect(() => {
		if (isFocused) dispatch(clear());
	}, [isFocused]);

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<View style={styles.imgContainer}>
					<Logo width={150} height={150} fill="#000" />
				</View>

				<View>
					<View style={styles.notificationContainer}>
						{totalNotification > 0 && (
							<Text style={styles.notificationText}>{totalNotification}</Text>
						)}
						<IconButton
							raised
							icon="bell"
							color="#003C95"
							style={styles.notification}
							onPress={() =>
								navigation.navigate('Notifications', { notifications })
							}
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
					<ProductList data={productData} navigation={navigation} />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Home;

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
});
