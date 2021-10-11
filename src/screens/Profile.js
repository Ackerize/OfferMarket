import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Title } from 'react-native-paper'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
            <Title style={styles.title}>Perfil</Title>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    title: {
		fontSize: 24,
		textAlign: 'center',
		marginVertical: 10,
		color: '#191B32',
	},
})
