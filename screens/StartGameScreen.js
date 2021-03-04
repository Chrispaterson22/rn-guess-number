import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

import Card from '../components/Card'

const StartGameScreen = () => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Start a New Game!</Text>
			<Card>
				<Text>Select a Number</Text>
				<TextInput />
				<View style={styles.btnContainer}>
					<Button title='Reset' onPress={() => {}} />
					<Button title='Confirm' onPress={() => {}} />
				</View>
			</Card>
		</View>
	)
}

export default StartGameScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		elevation: 7,
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
	},
	btnContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
})
