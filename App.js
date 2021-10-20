import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'
import Root from './src/components/Modals/Root'

LogBox.ignoreAllLogs(true)

const App = () => {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<Root>
					<NavigationContainer>
						<StackNavigation />
					</NavigationContainer>
				</Root>
			</PaperProvider>
		</SafeAreaProvider>
	)
}

export default App
