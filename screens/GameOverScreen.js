import React from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imgContainer}>
				<Image
					source={require('../assets/success.png')}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<BodyText>Number of rounds: {props.numOfRounds}</BodyText>
			<BodyText>Number was: {props.userNumber}</BodyText>
			<Button title='New Game' onPress={props.onRestart} />
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
})
