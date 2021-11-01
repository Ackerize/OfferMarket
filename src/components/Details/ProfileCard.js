import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileCard = ({ navigation, seller }) => {
	const { name, uid, photo } = seller;
	return (
		<View style={styles.containerPerfil}>
			<View style={styles.imgplusname}>
				<View>
					<Image style={styles.image} source={{ uri: photo }} />
				</View>
				<View style={styles.contactInfo}>
					<Text numberOfLines={1} style={styles.displayName}>
						{name}
					</Text>
					<Text style={styles.label}>Ver perfil</Text>
				</View>
				<View />
			</View>
			<TouchableRipple
				style={styles.icon}
				borderless
				onPress={() =>
					navigation.navigate('Profile', {
						idProfile: uid,
					})
				}>
				<Icon name="chevron-right" size={30} color="#060948" />
			</TouchableRipple>
		</View>
	);
};

export default ProfileCard;

const styles = StyleSheet.create({
	containerPerfil: {
		borderRadius: 10,
		marginTop: 30,
		backgroundColor: '#EDEFF1',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '95%',
		height: 63,
	},
	image: {
		width: 45,
		height: 45,
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
		marginRight: 15,
		borderRadius: 10,
		height: 34,
		width: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	displayName: {
		color: '#060948',
		fontWeight: 'bold',
		fontSize: 15,
	},
	label: {
		color: '#A6A7B2',
		fontWeight: 'bold',
		fontSize: 14,
	},
	contactInfo: {
		marginLeft: 8,
		maxWidth: '75%',
	},
});
