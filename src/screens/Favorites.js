import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ProductList from '../components/Products/ProductList';
import { useIsFocused } from '@react-navigation/native';
import { showToast } from '../components/Modals/CustomToast';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
import { useSelector } from 'react-redux';

const Favorites = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [favoritesProducts, setFavoritesProducts] = useState(null);

	const { uid } = useSelector(state => state.auth);

	useEffect(() => {
		if (isFocused) {
			axios
				.get(`${API_HOST}/favorites/${uid}`)
				.then(({ data }) => {
					const { error, message, favorites } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						const filteredFavorites = favorites.map(favorite => (favorite.product));
						setFavoritesProducts(filteredFavorites);
						
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					}
				});
		}
	}, [isFocused]);

	console.log('Favorites products: ', favoritesProducts);

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Title style={styles.title}>Favoritos</Title>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ProductList data={favoritesProducts} navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Favorites;

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
});
