import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import mapa from '../../assets/img/map.png'

const ConditionAndLocation = ({ condition, location }) => {
	return (
		<View style={styles.details}>
			<View style={{display: 'flex', flexDirection: 'row'}}>
				<Text style={{fontWeight: 'bold', color: '#060948', marginRight: 15,}}>
					Condición:
				</Text>
        <Text style={{fontWeight: '100',color: '#000000'}}>{condition}</Text>
			</View>
			<View style={styles.ubicationContainer}>
				<Text style={{fontWeight: 'bold', color: '#060948', marginRight: 15,}}>Ubicacion: </Text>
				{/*aqui tendria que ir la peticion o no se como se mostrara ese mapa :c*/}
				<Image style={{ width: 250}} source={mapa} />
			</View>
		</View>
	)
}

export default ConditionAndLocation

const styles = StyleSheet.create({
  ubicationContainer:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  details:{
    marginTop: 30,
  }
})
