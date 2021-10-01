import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Image } from 'react-native'
import { Avatar, Text, IconButton, Menu } from 'react-native-paper'
import avatarImg from '../assets/person.jpg'
import sofaImg from '../assets/sofa.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PersonalChat = ({ navigation }) => {
	const [visible, setVisible] = useState(false)

	const openMenu = () => setVisible(true)

	const closeMenu = () => setVisible(false)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Icon
					name="arrow-back-ios"
					size={24}
					color="black"
					style={styles.backArrow}
					onPress={() => navigation.goBack()}
				/>
				<View style={styles.contactInformation}>
					<Avatar.Image size={55} source={avatarImg} />
					<Text style={styles.name}>Juan Gallardo</Text>
				</View>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					anchor={
						<IconButton
							icon="dots-vertical"
							size={24}
							color="black"
							onPress={openMenu}
						/>
					}>
					<Menu.Item onPress={() => {}} title="Calificar vendedor" />
					<Menu.Item onPress={() => {}} title="Borrar chat" />
				</Menu>
			</View>
			<View style={styles.chat}>
				<View style={styles.dateContainer}>
					<Text style={styles.date}>Hoy</Text>
				</View>
				<View style={styles.product}>
					<View style={styles.infoContainer}>
						<Image style={styles.imgProduct} source={sofaImg} />
						<View style={styles.productInfo}>
							<Text style={styles.productName}>Sofá para dos personas</Text>
							<Text style={styles.productCategory}>Categoría: Hogar</Text>
						</View>
					</View>
					<Text style={styles.price}>$60</Text>
				</View>
				<View style={[styles.messageSendContainer, styles.messageFirst]}>
					<View style={styles.messageSend}>
						<Text style={styles.messageSendContent}>
							Hola, estoy interesado en este producto. Sigue disponible?
						</Text>
						<View style={styles.viewTime}>
							<Text style={styles.sendTime}>11:00</Text>
						</View>
					</View>
				</View>
				<View style={styles.messageReceiveContainer}>
					<View style={styles.messageReceive}>
						<Text style={styles.messageReceiveContent}>Ok.</Text>
						<View style={styles.viewTime}>
							<Text style={styles.receiveTime}>11:02</Text>
						</View>
					</View>
				</View>
				<View style={styles.messageSendContainer}>
					<View style={styles.messageSend}>
						<Text style={styles.messageSendContent}>
							Entendido, llegaré ahora por la tarde por él.
						</Text>
						<View style={styles.viewTime}>
							<Text style={styles.sendTime}>11:05</Text>
						</View>
					</View>
				</View>
				<View style={styles.messageReceiveContainer}>
					<View style={styles.messageReceive}>
						<Text style={styles.messageReceiveContent}>Ok, entendido.</Text>
						<View style={styles.viewTime}>
							<Text style={styles.receiveTime}>11:08</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default PersonalChat

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#EBEDF1',
	},
	header: {
		backgroundColor: '#fff',
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	backArrow: {
		marginHorizontal: 20,
	},
	contactInformation: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%',
	},
	name: {
		fontSize: 20,
		paddingLeft: 20,
	},
	dateContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},
	date: {
		fontSize: 16,
		borderRadius: 10,
		backgroundColor: '#FFF',
		width: 70,
		height: 30,
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	product: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#fff',
		height: 70,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	imgProduct: {
		width: 50,
		height: 50,
	},
	productInfo: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 20,
	},
	productName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	productCategory: {
		fontSize: 16,
		color: '#B1B4C3',
		fontWeight: 'bold',
	},
	price: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	messageFirst: {
		marginTop: 20,
	},
	messageSendContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: 15,
		marginVertical: 5,
	},
	messageSend: {
		backgroundColor: '#003C95',
        display: 'flex',
		flexDirection: 'row',
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 15,
		borderTopRightRadius: 0,
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		alignItems: 'center',
		minWidth: '30%',
		maxWidth: '80%',
	},
	messageSendContent: {
		color: '#fff',
		fontSize: 16,
        maxWidth: '90%',
	},
	sendTime: {
		fontSize: 13,
		color: '#F2F8FD',
		textAlign: 'right',
		paddingLeft: 20,
		fontWeight: 'bold',
	},
	messageReceiveContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginHorizontal: 15,
		marginVertical: 5,
	},
	messageReceive: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		alignItems: 'center',
		minWidth: '30%',
		maxWidth: '80%',
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 15,
		borderTopLeftRadius: 0,
	},
	messageReceiveContent: {
		color: '#000',
		fontSize: 16,
	},
	receiveTime: {
		fontSize: 13,
		paddingLeft: 10,
		color: '#B1B4C3',
		fontWeight: 'bold',
	},
	viewTime: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		height: '100%',
	},
})
