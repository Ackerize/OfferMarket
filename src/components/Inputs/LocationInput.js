import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

const LocationInput = ({ actualLocation = 'Elige una ubicación', onPress }) => {
	const locationLabel = actualLocation === null ? 'Elige una ubicación' : actualLocation
	return (
		<View style={styles.locationInput}>
			<Icon name="location-on" size={30} color="black" />
			<Text style={styles.locationLabeL}>{locationLabel}</Text>
			<TouchableRipple onPress={onPress} style={styles.btn} borderless>
				<Icon name="chevron-right" size={30} color="#060948" />
			</TouchableRipple>
		</View>
	)
}

export default LocationInput

const styles = StyleSheet.create({
	btn: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		paddingHorizontal: 2,
		paddingVertical: 2,
	},
	locationInput: {
		backgroundColor: '#EDEFF1',
		width: '95%',
		marginHorizontal: 10,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
		justifyContent: 'space-between',
	},
	locationLabeL: {
		color: '#060948',
		fontSize: 15,
	},
})

LocationInput.propTypes = {
	actualLocation: PropTypes.string,
	onPress: PropTypes.func.isRequired,
}
