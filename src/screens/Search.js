import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Search = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Icon
					name="arrow-back-ios"
					size={30}
					color="#003C95"
					style={styles.backArrow}
					onPress={() => navigation.goBack()}
				/>
                <Searchbar style={styles.search} ></Searchbar>
            </View>

            
            
            
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    header: {
        
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},

    backArrow: {
        
        marginTop:5,
		marginHorizontal: 10,
	},

    search: {
		height: 50,
		width: '70%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 5,
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