import React from 'react'
import { StyleSheet, View, Button, Image, Text } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imgContainer}>
				<Image
					source={require('../assets/success.png')}
					// source={{
					// 	uri:
					// 		'https://images.unsplash.com/photo-1513496497-82958929944d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
					// }}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed{' '}
					<Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to
					guess the number{' '}
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
			</View>
			<MainButton onPress={props.onRestart}>New Game</MainButton>
		</View>
	)
}

export default GameOverScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imgContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'grey',
		overflow: 'hidden',
		marginVertical: 30,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold',
	},
	resultContainer: {
		marginHorizontal: 50,
		marginBottom: 30,
	},
	resultText: {
		textAlign: 'center',
		fontSize: 20,
	},
})
