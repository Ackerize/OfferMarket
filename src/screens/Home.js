import { map } from 'lodash'
import React, { Component, useState } from 'react'
import { View } from 'react-native'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { Searchbar } from 'react-native-paper'
import { IconButton} from 'react-native-paper'



const Home = ({ navigation }) => {
	const categories = [
		{
			id: 1,
			name: "Reciente",
		},
		{
			id: 2,
			name: "Hogar",
		},
		{
			id: 3,
			name: "Belleza",
		},
		{
			id: 4,
			name: "Ropa",
		},
		{
			id: 5,
			name: "Telefonos",
		},
		{
			id: 6,
			name: "Computadoras",
		},
		];
	
		
	const [categorySelected, setCategorySelected] = useState(1);
	
	const onChangeCategory = (category) => {
		setCategorySelected(category);
	};
	
	



	return (
		<SafeAreaView>
			
			<IconButton raised icon="bell" color="#003C95" style={styles.notification}/>
			<Searchbar style={styles.input} ></Searchbar>
			
			<View style={styles.categories}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoryList}>
					{map(categories,(catg)=>(
						<Text key={catg.id}
						style={[
							catg.id !== categorySelected ? styles.category : styles.categorySelec,
						]}
					onPress={()=> onChangeCategory(catg.id)}>
					{catg.name}
					</Text>
					))}

				</ScrollView>
			</View>

		</SafeAreaView>
		
		
	)
}


export default Home

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: '95%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',

	},
	notification: {
		height: 50,
		color: '#fff',
		width: '15%',
		borderRadius: 10,
		fontSize: 18,
		borderWidth: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 40,
		backgroundColor: "#fff"
	},

	
	shadowOffset: {
	width: 0,
	height: 2,
},

categories: {
    marginTop: 20,
    marginBottom: 50,
},

	categoryList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
},
category: {
    marginRight: 20,
    fontSize: 16,
	borderWidth: 0.5,
	padding: 10,
	borderRadius: 10,
	fontFamily: "Roboto",
	fontWeight: "bold",
	backgroundColor: "#fff"
},

categorySelec: {
    marginRight: 20,
    fontSize: 16,
	borderWidth: 0.5,
	padding: 10,
	borderRadius: 10,
	fontFamily: "Roboto",
	fontWeight: "bold",
	backgroundColor: "#003C95",
	color: "#fff"
},

});
