import { useState } from 'react'
import type { Todo } from '@/types/todo'
import { Checkbox } from '@mantine/core'
import { InputWithButton } from 'components/InputWithButton'

export function Todos({ data }: { data: Todo[] }) {
	const [todosList, setTodosList] = useState(data)

	const addTodo = (text: string) => {
		if (text === '') {
			text = 'пустая тудушка'
		}
		// console.log('todosList.length:', todosList.length)
		const newTodo = {
			id: `todo-${todosList.length + 1}`,
			text,
			completed: false
		}
		setTodosList([...todosList, newTodo])
	}

	const toggleCompleted = (id: string) => {
		console.log(id)
		const updated = todosList.map((todo) => {
			if (id === todo.id) {
				return { ...todo, completed: !todo.completed }
			}
			return todo
		})
		setTodosList(updated)
	}

	return (
		<>
			<InputWithButton addTodoCallback={addTodo} />

			{todosList.map((todo: Todo) => (
				<Checkbox
					style={{ marginLeft: '10px', marginTop: '4px' }}
					radius='xl'
					id={todo.id}
					key={todo.id}
					label={todo.text}
					checked={todo.completed}
					onChange={(event) =>
						toggleCompleted(event.currentTarget.id)
					}
				/>
			))}
		</>
	)
}
