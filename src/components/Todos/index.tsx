// import { useState, useRef, useEffect } from 'react'
import { useState } from 'react'
import type { Todo } from '@/types/todo'
import { Checkbox } from '@mantine/core'
import { InputWithButton } from 'components/InputWithButton'

export function Todos({ data }: { data: Todo[] }) {
	const [todosList, setTodosList] = useState(data)

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
			<InputWithButton />

			{todosList.map((todo: Todo) => (
				<Checkbox
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
