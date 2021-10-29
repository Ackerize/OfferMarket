import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
const ProfileCard = ({ navigation, displayName, image }) => {
	return (
		<View style={styles.containerPerfil}>
			<View style={styles.imgplusname}>
				<View>
					<Image style={styles.image} source={image} />
				</View>
				<View>
					<Text style={styles.displayName}>{displayName}</Text>
					<Text>Ver perfil</Text>
				</View>
				<View />
			</View>
			<TouchableOpacity style={styles.icon}>
				<Icon  name="chevron-right" size={30} color="#060948" />
			</TouchableOpacity>
		</View>
	)
}

export default ProfileCard

const styles = StyleSheet.create({
	containerPerfil: {
    borderRadius: 10,
		marginTop: 60,
		backgroundColor: '#EDEFF1',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '95%',
		height: 60,
	},
	image: {
		width: 50,
		height: 50,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 10,
	},
	imgplusname: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		backgroundColor: '#fff',
		marginRight: 10,
    borderRadius: 10,
	},
  displayName:{
    color: '#060948',
    fontWeight: 'bold',
  }
})
