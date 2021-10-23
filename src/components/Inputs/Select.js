import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import RNSingleSelect from '@freakycoder/react-native-single-select'

const Select = ({ label, data, placeholder }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label} </Text>
			<RNSingleSelect
				buttonContainerStyle={styles.buttonContainerStyle}
				data={data}
				searchEnabled={false}
				width={'100%'}
				menuBarContainerWidth={'100%'}
				menuBarContainerHeight={51.5 * data.length}
				placeholder={placeholder}
				onSelect={selectedItem => console.log('SelectedItem: ', selectedItem)}
			/>
		</View>
	)
}

export default Select

const styles = StyleSheet.create({
	container: {
		marginVertical: 15,
	},
	buttonContainerStyle: {
		borderColor: '#E6E6E6',
		borderWidth: 2,
		borderRadius: 10,
		borderTopEndRadius: 10,
		borderTopStartRadius: 10,
		paddingVertical: 6,
		fontSize: 16,
	},
	label: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 10,
	},
})

Select.propTypes = {
	label: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	placeholder: PropTypes.string.isRequired,
}
