import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	Button,
	Image,
	Text,
	Dimensions,
	ScrollView,
} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get('window').width
	)
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	)

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

	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText style={{ marginTop: 10 }}>The Game is Over!</TitleText>
				<View
					style={{
						...styles.imgContainer,
						...{
							width:
								availableDeviceHeight < 500
									? availableDeviceHeight * 0.7
									: availableDeviceWidth * 0.7,
							height:
								availableDeviceHeight < 500
									? availableDeviceHeight * 0.7
									: availableDeviceWidth * 0.7,
							borderRadius: (availableDeviceWidth * 0.7) / 2,
							marginVertical: availableDeviceHeight / 30,
						},
					}}
				>
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
				<View
					style={{
						...styles.resultContainer,
						...{ marginBottom: availableDeviceHeight / 60 },
					}}
				>
					<BodyText
						style={{
							...styles.resultText,
							...{ fontSize: availableDeviceHeight < 550 ? 16 : 20 },
						}}
					>
						Your phone needed{' '}
						<Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to
						guess the number{' '}
						<Text style={styles.highlight}>{props.userNumber}</Text>
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>New Game</MainButton>
			</View>
		</ScrollView>
	)
}

export default GameOverScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
	},
	imgContainer: {
		borderWidth: 3,
		borderColor: 'grey',
		overflow: 'hidden',
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
	},
	resultText: {
		textAlign: 'center',
	},
})
