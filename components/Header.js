import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'

import Colors from '../constants/colors'
import TitleText from '../components/TitleText'

const Header = props => {
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get('window').height
	)

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(Dimensions.get('window').height)
		}

		Dimensions.addEventListener('change', updateLayout)
		return () => {
			Dimensions.removeEventListener('change', updateLayout)
		}
	})

	return (
		<View
			style={{
				...styles.headerBase,
				...{
					height: availableDeviceHeight < 550 ? 50 : 90,
					paddingTop: availableDeviceHeight < 550 ? 16 : 36,
				},
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid,
				}),
			}}
		>
			<TitleText style={styles.title}>{props.title}</TitleText>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	headerBase: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerIOS: {
		backgroundColor: 'white',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	headerAndroid: {
		backgroundColor: Colors.primary,
	},
	title: {
		color: Platform.OS === 'ios' ? 'Colors.primary' : '#fff',
	},
})
