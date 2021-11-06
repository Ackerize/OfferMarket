import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectLocation } from '../actions/profile';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAiatjF-bmk1fr8Dk7QS4wEGjCiHMjAdZg';

const SearchLocation = ({ route }) => {
	const type = route?.params?.type;

	const dispatch = useDispatch();

	const {
		location: { name: currentLocation, ...rest },
	} = useSelector(state => state.profile);

	useEffect(() => {
		if (!currentLocation) {
			dispatch(
				selectLocation({
					latitude: 13.672945,
					longitude: -89.300506,
					name: 'Santa Tecla',
				}),
			);
		}
	}, []);

	const isMarker = rest.longitude && rest.latitude ? rest : null;

	const [marker, setMarker] = useState(isMarker);
	const [location, setLocation] = useState({
		lat: rest.latitude || 13.672945,
		lng: rest.longitude || -89.300506,
	});

	const onUpdateLocation = (coords, name) => {
		setMarker(coords);
		setLocation(coords);
		dispatch(selectLocation({ ...coords, name }));
	};

	return (
		<View style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<GooglePlacesAutocomplete
				placeholder="Buscar una ciudad"
				minLength={2}
				query={{
					key: GOOGLE_PLACES_API_KEY,
					language: 'en',
					components: 'country:sv',
				}}
				fetchDetails={true}
				GooglePlacesDetailsQuery={{ fields: 'geometry' }}
				onPress={(data, details = null) => {
					const coords = details?.geometry?.location;
					const citySplit = data.description.split(', ');
					const city = citySplit[citySplit.length - 2];
					onUpdateLocation(coords, city);
				}}
				onFail={error => console.error(error)}
				styles={{
					textInputContainer: styles.textInputContainer,
					textInput: styles.textInput,
					listView: styles.listView,
				}}
				textInputProps={{
					autoFocus: true,
					returnKeyType: 'search',
				}}
			/>
			<View style={styles.location}>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						region={{
							latitude: location?.lat || location?.latitude,
							longitude: location?.lng || location?.longitude,
							latitudeDelta: 0.01022,
							longitudeDelta: 0.01421,
						}}
						onPress={e => {
							onUpdateLocation(e.nativeEvent.coordinate, currentLocation);
						}}>
						{type === 'filter' && (
							<Circle
								center={{
									latitude: rest.latitude || 13.672945,
									longitude: rest.longitude || -89.300506,
								}}
								radius={750}
								fillColor="rgba(161, 179, 206, 0.4)"
								strokeColor="rgba(161, 179, 206, 0.4)"
								zIndex={2}
								strokeWidth={2}
							/>
						)}
						{
							type === 'filter' && (
								<Marker
								coordinate={{
									latitude: rest.latitude || 13.672945,
									longitude: rest.longitude || -89.300506,
								}}
								title="Ubicación de búsqueda"
							/>
							)
						}
						{marker && (
							<Marker
								coordinate={{
									latitude: marker?.lat || marker?.latitude,
									longitude: marker?.lng || marker?.longitude,
								}}
								title="Mi ubicación"
							/>
						)}
					</MapView>
				</View>
			</View>
		</View>
	);
};

export default SearchLocation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
		paddingTop: 10,
		backgroundColor: '#ffffff',
	},
	textInputContainer: {
		borderRadius: 7,
		marginLeft: 50,
		marginRight: 10,
		backgroundColor: '#fff',
		borderColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 4,
	},
	textInput: {
		fontSize: 16,
		height: 38,
		color: '#060948',
	},
	listView: {
		marginTop: 50, // This right here - remove the margin top and click on the first result, that will work.
		elevation: 1,
		backgroundColor: 'white',
		position: 'absolute', // and the absolute position.
		zIndex: 500,
	},
	location: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '92%',
		paddingBottom: 100,
		zIndex: -1,
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderRadius: 10,
		overflow: 'hidden',
	},
	map: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 10,
	},
});
