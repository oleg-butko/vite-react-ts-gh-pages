// import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.css'
import type { Todo } from '@/types/todo'
import { Todos } from 'components/Todos'

const DATA: Todo[] = [
	{ id: 'todo-1', text: 'text of todo-1', completed: false },
	{ id: 'todo-2', text: 'text of todo-2', completed: false },
	{ id: 'todo-3', text: 'text of todo-3', completed: false }
]

function App() {
	return (
		<MantineProvider>
			<h1>TODOs</h1>
			<Todos data={DATA} />
		</MantineProvider>
	)
}

export default App
