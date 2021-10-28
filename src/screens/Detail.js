import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native'
import ProfileCard from '../components/Details/ProfileCard'
import laptop from '../assets/img/laptop.png'
import sofa from '../assets/img/sofa.png'
import CarouselProduct from '../components/Details/CarouselProduct'
import person from '../assets/img/person.jpg'
import ConditionAndLocation from '../components/Details/ConditionAndLocation'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const Detail = ({ navigation }) => {
	const [selected, setSelected] = useState(true)

	const data = [{ url: laptop }, { url: laptop }, { url: sofa }, { url: sofa }]
	console.log(selected)
	return (
		<SafeAreaView style={styles.principalContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Zenbook Duo</Text>
				<Text style={{ color: '#A9A9B7' }}>Marca: Asus</Text>
				<View style={{ marginTop: 25 }}>
					<CarouselProduct images={data} />
				</View>
				<ProfileCard
					displayName={'Pedro Palacios'}
					navigation={navigation}
					image={person}
				/>
				<View style={styles.titles}>
					<TouchableOpacity onPress={() => setSelected(true)}>
						<Text style={selected ? styles.colorBlue : styles.colorGrey}>
							Descripción
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSelected(false)}>
						<Text style={selected ? styles.colorGrey : styles.colorBlue}>
							Detalles
						</Text>
					</TouchableOpacity>
				</View>
				{selected ? (
					<Text style={styles.description}>
						Este portátil tiene una pantalla de 15.6’’ OLED 4K 16:9 táctil.
						Cuenta con un Intel Core i9-9980HK. La conectividad inalámbrica está
						bien cubierta con Bluetooth 5.0 y WiFi 6. El tacto del touchpad ...
					</Text>
				) : (
					<ConditionAndLocation condition={'Usado'} />
				)}
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.bottomContainerDirection}>
					<View style={{marginRight: 35}}>
						<Text style={{color: '#A6A7B2', fontWeight: 'bold'}}>Precio</Text>
						<Text style={styles.price}>$1,500</Text>
					</View>
					<TouchableOpacity style={styles.btn}>
						<Text style={{ color: '#fff' }}>Enviar Mensaje</Text>
						<Icon name="send" size={30} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Detail

const styles = StyleSheet.create({
	principalContainer: {
		backgroundColor: '#fff',
		width: '100%',
		height: '100%',
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 65,
		marginLeft: 25,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#060948',
	},
	description: {
		marginTop: 30,
		color: '#A6A7B2',
	},
	colorBlue: {
		color: '#060948',
		fontWeight: 'bold',
		borderBottomColor: '#060948',
		borderBottomWidth: 2,
	},
	colorGrey: {
		color: '#A6A7B2',
		fontWeight: 'bold',
	},
	titles: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-evenly',
		marginTop: 25,
	},
	btn: {
		backgroundColor: '#070B59',
    width: 200,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
	bottomContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
    alignItems: 'center',
		bottom: 30,
	},
  bottomContainerDirection:{
    display: 'flex',
    flexDirection: 'row',
  },
  price:{
    color: '#060948',
    fontSize: 22,
    fontWeight: 'bold',
  }
})
