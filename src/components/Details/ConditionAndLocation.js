import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ConditionAndLocation = ({ condition, location, name }) => {
	console.log(location);
	const { name: city, ...coords } = location;
	return (
		<View style={styles.details}>
			<View style={styles.detailsContainer}>
				<Text style={styles.label}>Condición:</Text>
				<Text style={styles.condition}>{condition}</Text>
			</View>
			<Text style={styles.label}>Ubicacion: </Text>
			<View style={styles.location}>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						region={{
							...coords,
							latitudeDelta: 0.003757,
							longitudeDelta: 0.001842,
						}}>
						<Marker coordinate={coords} title={name} />
					</MapView>
				</View>
			</View>
		</View>
	);
};

export default ConditionAndLocation;

const styles = StyleSheet.create({
	ubicationContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 15,
	},
	details: {
		marginTop: 15,
	},
	location: {
		marginTop: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '94%',
		height: 250,
		marginBottom: 40,
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
	detailsContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	label: {
		fontWeight: 'bold',
		color: '#060948',
		fontSize: 16,
		marginRight: 15,
		marginVertical: 5,
	},
	condition: {
		fontWeight: '100',
		color: '#000000',
		marginVertical: 5,
		fontSize: 16,
	},
});
