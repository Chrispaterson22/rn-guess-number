import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native'

import Colors from '../constants/colors'

const MainButton = props => {
	let ButtonComponent = TouchableOpacity

	if (Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback
	}

	return (
		<View style={styles.btnContainer}>
			<ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
				<View style={styles.btn}>
					<Text style={styles.btnText}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	)
}

export default MainButton

const styles = StyleSheet.create({
	btnContainer: {
		borderRadius: 25,
		overflow: 'hidden',
	},
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
