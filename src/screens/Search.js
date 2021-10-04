import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const Search = ({ navigation }) => {
	return (
		<SafeAreaView>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<Searchbar style={styles.search} iconColor="#003C95" autoFocus={true} />
			</View>
		</SafeAreaView>
	)
}

export default Search

const styles = StyleSheet.create({
	header: {
		paddingVertical: 3,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},

	search: {
		height: 50,
		width: '83%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 5,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
})
