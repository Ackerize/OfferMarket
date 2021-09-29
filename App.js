import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { Popup } from 'popup-ui'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs(true)

const App = () => {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<NavigationContainer>
					<StackNavigation />
					<Popup
						ref={c => {
							if (c) Popup.popupInstance = c
						}}
					/>
				</NavigationContainer>
			</PaperProvider>
		</SafeAreaProvider>
	)
}

export default App
