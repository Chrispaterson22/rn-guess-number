import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from '../constants/colors'

const MainButton = props => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
			<View style={styles.btn}>
				<Text style={styles.btnText}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default MainButton

const styles = StyleSheet.create({
	btn: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	btnText: {
		color: '#fff',
		fontFamily: 'open-sans',
		fontSize: 18,
	},
})
