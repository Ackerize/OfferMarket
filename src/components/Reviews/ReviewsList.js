import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReviewItem from './ReviewItem'


const ReviewsList = () => {
    return (
        <View style={styles.container}>
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
        </View>
    )
}

export default ReviewsList

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
    }
})
