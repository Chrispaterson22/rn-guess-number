import React, { useState, useRef, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Alert,
	ScrollView,
	FlatList,
	Dimensions,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

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

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
)

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get('window').width
	)
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	)

	const currLow = useRef(1)
	const currHigh = useRef(100)

	const { userChoice, onGameOver } = props

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width)
			setAvailableDeviceHeight(Dimensions.get('window').height)
		}

		Dimensions.addEventListener('change', updateLayout)
		return () => {
			Dimensions.removeEventListener('change', updateLayout)
		}
	})

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length)
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
			currLow.current = currentGuess + 1
		}
		const nextNum = generateRandomBetween(
			currLow.current,
			currHigh.current,
			currentGuess
		)
		setCurrentGuess(nextNum)
		// setRounds(curRounds => curRounds + 1)
		setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses])
	}

	let listContainerStyle = styles.listContainer

	if (availableDeviceWidth < 350) {
		listContainerStyle = styles.listContainerBig
	}

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<Text style={DefaultStyles.title}>Opponent's Guess</Text>
				<View style={styles.gameLandscape}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<AntDesign name='down' size={24} color='white' />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
						<AntDesign name='up' size={24} color='white' />
					</MainButton>
				</View>
				<View style={listContainerStyle}>
					{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, idx) =>
						renderListItem(guess, pastGuesses.length - idx)
					)}
					</ScrollView> */}
					<FlatList
						keyExtractor={item => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(this, pastGuesses.length)}
						contentContainerStyle={styles.list}
					/>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card
				style={{
					...styles.btnContainer,
					...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 },
				}}
			>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<AntDesign name='down' size={24} color='white' />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
					<AntDesign name='up' size={24} color='white' />
				</MainButton>
			</Card>
			<View style={listContainerStyle}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, idx) =>
						renderListItem(guess, pastGuesses.length - idx)
					)}
					</ScrollView> */}
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
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
	gameLandscape: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%',
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
		maxWidth: '95%',
		minWidth: 300,
	},
	listItem: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	listContainer: {
		flex: 1,
		width: '60%',
	},
	listContainerBig: {
		flex: 1,
		width: '80%',
	},
	list: {
		flexGrow: 1,
		// alignItems: 'center',
		justifyContent: 'flex-end',
	},
})
