import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Dimensions,
} from 'react-native';
import {
	Title,
	Avatar,
	Button,
	TouchableRipple,
	Menu,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AirbnbRating } from 'react-native-elements';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductList from '../components/Products/ProductList';
import ContactInfo from '../components/ContactInfo';
import Reviews from '../components/Reviews/Reviews';
import { startLogout } from '../actions/auth';
import Popup from '../components/Modals/Popup';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
import { useIsFocused } from '@react-navigation/native';


const heightScreen = Dimensions.get('window').height;

const Profile = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [activeTab, setActiveTab] = useState('products');
	const [visible, setVisible] = useState(false);
	const [profile, setProfile] = useState(null);

	const dispatch = useDispatch();
	const { typeLogin, uid } = useSelector(state => state.auth);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	const handleLogOut = () => {
		closeMenu();
		dispatch(startLogout(typeLogin));
	};

	useEffect(() => {
		if(isFocused) {
			axios
			.get(`${API_HOST}/profiles/${uid}`)
			.then(({ data }) => {
				const { error, message, data: profileInfo } = data;
				if (error) {
					Popup.show({
						type: 'Danger',
						title: '¡Oh no!',
						textBody: message,
						buttontext: 'Aceptar',
						callback: () => Popup.hide(),
					});
				} else {
					setProfile(profileInfo);
				}
			})
			.catch(({ response: { data } }) => {
				const { error, message } = data;
				if (error) {
					Popup.show({
						type: 'Danger',
						title: '¡Oh no!',
						textBody: message,
						buttontext: 'Aceptar',
						callback: () => Popup.hide(),
					});
				}
			});
		}
	}, [isFocused]);

	if (!profile) return <Spinner />;

	const { photo, name, rating, ...contactInfo } = profile;
	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.headerTitle}>
				<Title style={styles.title}>Perfil</Title>
				<TouchableRipple onPress={openMenu} style={styles.touchable}>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={<Icon name="more-vert" color="#060948" size={30} />}>
						<Menu.Item onPress={handleLogOut} title="Cerrar sesión" />
					</Menu>
				</TouchableRipple>
			</View>
			<View style={styles.header}>
				<Avatar.Image size={75} source={{ uri: photo }} />

				<Text style={styles.name}>{name}</Text>
				<View style={styles.ratingContainer}>
					<Text style={styles.countStar}>{rating.toFixed(1)}</Text>
					<AirbnbRating
						showRating={false}
						defaultRating={rating}
						starContainerStyle={styles.rating}
						isDisabled={true}
						starStyle={styles.star}
					/>
				</View>
				<View style={styles.btnContainer}>
					<Button
						mode="contained"
						style={styles.btnPrimary}
						onPress={() =>
							navigation.navigate('ProductForm', { name: 'Nuevo producto' })
						}>
						<Text style={[styles.btnText, styles.btnPrimaryText]}>
							Nuevo producto
						</Text>
					</Button>
					<Button
						mode="contained"
						style={styles.btnSecundary}
						onPress={() => {
							navigation.navigate('ProfileForm', {
								name: 'Editar perfil',
								profile
							});
						}}>
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
					<TouchableWithoutFeedback onPress={() => setActiveTab('contact')}>
						<Text
							style={[styles.tab, activeTab == 'contact' && styles.activeTab]}>
							Contacto
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
					showsVerticalScrollIndicator={true}>
					{activeTab == 'products' && <ProductList />}
					{activeTab == 'contact' && (
						<ContactInfo
							info={{
								name,
								...contactInfo,
							}}
						/>
					)}
					{activeTab == 'reviews' && <Reviews />}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
	},
	headerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingRight: 10,
		paddingTop: 10,
	},
	title: {
		fontSize: 24,
		marginVertical: 10,
		width: '100%',
		textAlign: 'center',
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
		backgroundColor: '#070B59',
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
		maxHeight: heightScreen - 340,
		marginTop: 20,
	},
	touchable: {
		marginRight: 5,
		padding: 8,
		position: 'absolute',
		right: 10,
		top: 10,
	},
});
