import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

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
				...styles.header,
				...{
					height: availableDeviceHeight < 550 ? 50 : 90,
					paddingTop: availableDeviceHeight < 550 ? 16 : 36,
				},
			}}
		>
			<TitleText>{props.title}</TitleText>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	header: {
		width: '100%',

		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
