import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'
import Root from './src/components/Modals/Root'

import { Provider } from 'react-redux'
import reduxStore from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'

LogBox.ignoreAllLogs(true)

const App = () => {
	const { store, persistor } = reduxStore()

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<PaperProvider>
						<Root>
							<NavigationContainer>
								<StackNavigation />
							</NavigationContainer>
						</Root>
					</PaperProvider>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}

export default App
