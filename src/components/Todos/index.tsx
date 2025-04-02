import { useState, useEffect } from 'react'
import {
	Checkbox,
	SegmentedControl,
	Text,
	Space,
	useMantineTheme
} from '@mantine/core'
import type { Todo } from '@/types/todo'
import { Paper, Flex } from '@mantine/core'
import { InputWithButton } from 'components/InputWithButton'

type Filter = 'All' | 'Active' | 'Completed'

export function Todos({ data }: { data: Todo[] }) {
	const theme = useMantineTheme()
	const [todosList, setTodosList] = useState(data)
	const [filter, setFilter] = useState<Filter>('All')
	const [visibleTodos, setVisibleTodos] = useState(todosList)
	const notCompletedNum = todosList.filter((todo) => !todo.completed).length

	useEffect(() => {
		setVisibleTodos(
			todosList.filter((todo) => {
				if (filter === 'Completed') {
					return todo.completed
				} else if (filter === 'Active') {
					return !todo.completed
				} else {
					return todo
				}
			})
		)
	}, [todosList, filter])

	const addTodo = (text: string) => {
		if (text === '') {
			text = 'пустая тудушка'
		}
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

			<Space h='md' />

			{visibleTodos.map((todo: Todo) => (
				<Checkbox
					style={{ marginLeft: '10px', marginTop: '4px' }}
					size='lg'
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
			<Space h='md' />
			<Paper withBorder pl='sm' pr='sm'>
				<Flex gap='md' justify='center' align='center' direction='row'>
					<Text
						fz='lg'
						fw={400}
						style={{
							verticalAlign: 'center',
							alignItems: 'center'
						}}>
						{`${notCompletedNum} item(s) left`}
					</Text>
					<SegmentedControl
						onChange={(val) => {
							setFilter(val as Filter)
						}}
						withItemsBorders={false}
						bg={'#ddd'}
						color={theme.colors.cyan[5]}
						size='sm'
						// size='input-sm'
						data={['All', 'Active', 'Completed']}
					/>
				</Flex>
			</Paper>
		</>
	)
}
