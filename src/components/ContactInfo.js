import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

var width = Dimensions.get('window').width; //full width of the screen

const ContactInfo = ({ info }) => {
	const {
		name,
		phone,
		email,
		location: { name: city, ...coords },
	} = info;
	return (
		<View style={styles.contactContainer}>
			<Text style={styles.item}>
				<Text style={styles.label}>Número de teléfono: </Text> {phone}
			</Text>
			<Text style={styles.item}>
				<Text style={styles.label}>Email: </Text> {email}
			</Text>
			<Text style={[styles.item, styles.label]}>Ubicación: </Text>
			<View style={styles.location}>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						region={{
							...coords,
							latitudeDelta: 0.003757,
							longitudeDelta: 0.001842,
						}}>
						<Marker
							coordinate={coords}
							title={name}
							description={`Ubicación de ${name}`}
						/>
					</MapView>
				</View>
			</View>
		</View>
	);
};

export default ContactInfo;

const styles = StyleSheet.create({
	contactContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: width - 60,
		paddingHorizontal: 20,
		paddingBottom: 110,
	},
	label: {
		fontWeight: 'bold',
		color: '#060948',
	},
	item: {
		color: '#000000',
		fontSize: 15,
		marginTop: 10,
	},
	location: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 250,
		paddingBottom: 100,
	},
	container: {
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
