// import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.css'
import type { Todo } from '@/types/todo'
import { Todos } from '@/components/Todos'

const DATA: Todo[] = [
	{ id: 'todo-1', text: 'text 1', completed: false },
	{ id: 'todo-2', text: 'text 2', completed: false },
	{ id: 'todo-3', text: 'text 3', completed: false }
]

function App() {
	return (
		<MantineProvider>
			<h3>TODOs</h3>
			<Todos data={DATA} />
		</MantineProvider>
	)
}

export default App
