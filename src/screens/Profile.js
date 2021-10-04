import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const Profile = () => {
    return (
        <SafeAreaView>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
            <Text>Profile</Text>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})
