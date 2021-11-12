import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import ProfileCard from '../components/Details/ProfileCard';
import CarouselProduct from '../components/Details/CarouselProduct';
import ConditionAndLocation from '../components/Details/ConditionAndLocation';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
import { showToast } from '../components/Modals/CustomToast';
import Spinner from '../components/Spinner';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useSelector } from 'react-redux';
import FavoriteButton from '../components/Buttons/FavoriteButton';
import DeleteButton from '../components/Buttons/DeleteButton';
import { useIsFocused } from '@react-navigation/native';
import ConfirmModal from '../components/Modals/ConfirmModal';

const heightScreen = Dimensions.get('window').height;

const Detail = ({ navigation, route }) => {
	const isFocused = useIsFocused();
	const [selected, setSelected] = useState(true);
	const idProduct = route?.params?.id;
	const { uid } = useSelector(state => state.auth);
	const [productData, setProductData] = useState(null);
	const [isFavoriteProduct, setIsFavoriteProduct] = useState(null);
	const [confirm, setConfirm] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (isFocused) {
			axios
				.get(`${API_HOST}/products/${idProduct}`)
				.then(({ data }) => {
					const { error, message, product } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						setProductData(product);
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
						console.log({ errorMessage });
					}
				});

			axios
				.get(`${API_HOST}/favorites/${uid}/${idProduct}`)
				.then(({ data }) => {
					const { error, message, isFavorite } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						setIsFavoriteProduct(isFavorite);
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
						console.log({ errorMessage });
					}
				});
		}
	}, [isFocused]);

	useEffect(() => {
		if (confirm) {
			axios
				.delete(`${API_HOST}/products/${idProduct}`)
				.then(({ data }) => {
					const { error, message } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						showToast('success', 'Producto eliminado', message);
						navigation.goBack();
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
						console.log({ errorMessage });
					}
				});
		}
	}, [confirm]);

	if (!productData || isFavoriteProduct === null) return <Spinner />;

	const {
		name,
		brand,
		description,
		images,
		location,
		price,
		seller,
		condition,
	} = productData;

	const { uid: idSeller } = seller;

	const imageData = images.map(image => ({ url: image }));

	const handleFavorite = () => {
		if (!isFavoriteProduct) {
			const postData = {
				user: uid,
				product: idProduct,
			};
			axios
				.post(`${API_HOST}/favorites`, postData)
				.then(({ data }) => {
					const { error, message } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						showToast('success', 'Agregado a favoritos', message);
						setIsFavoriteProduct(true);
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
						console.log({ errorMessage });
					}
				});
		} else {
			axios
				.delete(`${API_HOST}/favorites/${uid}/${idProduct}`)
				.then(({ data }) => {
					const { error, message } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
					} else {
						showToast('success', 'Eliminado de favoritos', message);
						setIsFavoriteProduct(false);
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						showToast('error', '¡Oh no!', message);
						console.log({ errorMessage });
					}
				});
		}
	};

	const handleDelete = () => {
		setVisible(true);
	};

	const handleEdit = () => {
		navigation.navigate('ProductForm', { product: productData });
	};

	const handleMessage = () => {
		navigation.navigate('PersonalChat', { uid, idSeller });
	};

	return (
		<SafeAreaView style={styles.principalContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<ConfirmModal
				visible={visible}
				setVisible={setVisible}
				setConfirm={setConfirm}
				title="¿Desea borrar el producto?"
			/>
			{idSeller === uid ? (
				<DeleteButton onPress={handleDelete} />
			) : (
				<FavoriteButton
					onPress={handleFavorite}
					isFavoriteProduct={isFavoriteProduct}
				/>
			)}
			<ScrollView
				style={[styles.titleContainer, styles.scrollView]}
				showsVerticalScrollIndicator={true}>
				<Text numberOfLines={1} style={styles.title}>
					{name}
				</Text>
				{brand ? (
					<Text style={{ color: '#A9A9B7' }}>Marca: {brand}</Text>
				) : (
					<View style={{ height: 20 }} />
				)}
				<View style={{ marginTop: 20 }}>
					<CarouselProduct images={imageData} />
				</View>
				{idSeller !== uid && (
					<ProfileCard seller={seller} navigation={navigation} />
				)}
				<View style={styles.titles}>
					<TouchableOpacity onPress={() => setSelected(true)}>
						<Text style={selected ? styles.colorBlue : styles.colorGrey}>
							Descripción
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSelected(false)}>
						<Text style={selected ? styles.colorGrey : styles.colorBlue}>
							Detalles
						</Text>
					</TouchableOpacity>
				</View>
				{selected ? (
					<Text style={styles.description}>{description}</Text>
				) : (
					<ConditionAndLocation
						condition={condition}
						location={location}
						name={name}
					/>
				)}
			</ScrollView>
			<View style={styles.bottomContainer}>
				<View style={styles.bottomContainerDirection}>
					<View style={{ marginRight: 35 }}>
						<Text style={{ color: '#A6A7B2', fontWeight: 'bold' }}>Precio</Text>
						<Text style={styles.price}>${price.toFixed(2)}</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={idSeller === uid ? handleEdit : handleMessage}>
						<View style={[styles.btn]}>
							{idSeller === uid && <Icon name="edit" size={30} color="#fff" />}
							<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
								{idSeller === uid ? 'Editar producto' : 'Enviar mensaje'}
							</Text>
							{idSeller !== uid && <Icon name="send" size={30} color="#fff" />}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Detail;

const styles = StyleSheet.create({
	principalContainer: {
		backgroundColor: '#fff',
		width: '100%',
		height: '100%',
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 90,
		marginLeft: 25,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#060948',
		maxWidth: '90%',
	},
	description: {
		marginVertical: 15,
		color: '#A6A7B2',
		paddingHorizontal: 15,
		fontSize: 16,
	},
	colorBlue: {
		color: '#060948',
		fontWeight: 'bold',
		borderBottomColor: '#060948',
		borderBottomWidth: 2,
		marginHorizontal: 10,
	},
	colorGrey: {
		color: '#A6A7B2',
		fontWeight: 'bold',
		marginHorizontal: 10,
	},
	titles: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		marginTop: 25,
	},
	btn: {
		backgroundColor: '#070B59',
		width: 190,
		height: 50,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginLeft: 25,
	},
	bottomContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		alignItems: 'center',
		bottom: 25,
	},
	bottomContainerDirection: {
		display: 'flex',
		flexDirection: 'row',
	},
	price: {
		color: '#060948',
		fontSize: 22,
		fontWeight: 'bold',
	},
	scrollView: {
		maxHeight: heightScreen - 160,
		marginBottom: 80,
	},
});
