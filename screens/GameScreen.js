import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	const randNum = Math.floor(Math.random() * (max - min)) + min

	if (randNum === exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return randNum
	}
}

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	)
	const [rounds, setRounds] = useState(0)

	const currLow = useRef(1)
	const currHigh = useRef(100)

	const { userChoice, onGameOver } = props

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds)
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'higher' && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", 'Please give correct hint...', [
				{ text: 'OK', style: 'cancel' },
			])
			return
		}

		if (direction === 'lower') {
			currHigh.current = currentGuess
		} else {
			currLow.current = currentGuess
		}
		const nextNum = generateRandomBetween(
			currLow.current,
			currHigh.current,
			currentGuess
		)
		setCurrentGuess(nextNum)
		setRounds(curRounds => curRounds + 1)
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.btnContainer}>
				<Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
				<Button
					title='HIGHER'
					onPress={nextGuessHandler.bind(this, 'higher')}
				/>
			</Card>
		</View>
	)
}

export default GameScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
})
