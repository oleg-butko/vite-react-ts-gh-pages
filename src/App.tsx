// import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.css'
// import { InputWithButton } from '@/components/InputWithButton'
import { InputWithButton } from 'components/InputWithButton'

function App() {
	return (
		<MantineProvider>
			<h1>TODOs</h1>
			<InputWithButton />
		</MantineProvider>
	)
}

export default App
