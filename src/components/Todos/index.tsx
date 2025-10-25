import { useState, useEffect } from 'react'
import { Checkbox, SegmentedControl, Text, Space, useMantineTheme } from '@mantine/core'
import type { Todo } from '@/types/todo'
import { Paper, Flex } from '@mantine/core'
import { useIsFirstRender } from '@mantine/hooks'
import { useDidUpdate } from '@mantine/hooks'

import { InputWithButton } from '@/components/InputWithButton'

type Filter = 'All' | 'Active' | 'Completed'

// TODO maybe make cache for apiGetAllTodos request
const DEFAULT_DATA: Todo[] = [
  { id: 'todo-1', text: 'text 1', completed: false },
  { id: 'todo-2', text: 'text 2', completed: false },
  { id: 'todo-3', text: 'text 3', completed: false }
]
const HOW_MANY_TODOS_GET_MAX = 10

async function apiGetAllTodos() {
  return fetch(`https://jsonplaceholder.typicode.com/todos`).then(res => res.json())
}

export function Todos() {
  const theme = useMantineTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadedOnce, setLoadedOnce] = useState<boolean>(false)
  const [todosList, setTodosList] = useState(DEFAULT_DATA)
  const [filter, setFilter] = useState<Filter>('All')
  const [visibleTodos, setVisibleTodos] = useState(todosList)
  const notCompletedNum = todosList.filter(todo => !todo.completed).length
  const firstRender = useIsFirstRender()
  console.log(`loadedOnce: ${loadedOnce}` + (firstRender ? `  firstRender: ${firstRender}` : ''))
  useDidUpdate(() => {
    // Will not be called when mounted"),
    setVisibleTodos(
      todosList.filter(todo => {
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

  useEffect(() => {
    // console.log(`useEffect> loadedOnce: ${loadedOnce}  firstRender: ${firstRender}`)
    if (!loadedOnce) {
      apiGetAllTodos()
        .then(res => {
          const newData: Todo[] = []
          const iMax = res.length > HOW_MANY_TODOS_GET_MAX ? HOW_MANY_TODOS_GET_MAX : res.length
          for (let i = 0; i < iMax; i++) {
            newData.push({
              id: `todo-${res[i].id}`,
              text: res[i].title,
              completed: res[i].completed
            })
          }
          setLoadedOnce(true)
          setTodosList(newData)
        })
        .finally(() => setLoading(false))
    }
  }, [firstRender, loadedOnce])

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
    console.log('toggleCompleted', id)
    const updated = todosList.map(todo => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodosList(updated)
  }

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <InputWithButton addTodoCallback={addTodo} />

          <Space h="md" />

          {visibleTodos.map((todo: Todo) => (
            <Checkbox
              style={{ marginLeft: '10px', marginTop: '4px' }}
              size="lg"
              radius="xl"
              id={todo.id}
              key={todo.id}
              label={todo.text}
              checked={todo.completed}
              onChange={event => toggleCompleted(event.currentTarget.id)}
            />
          ))}
          <Space h="md" />
          <Paper withBorder pl="sm" pr="sm">
            <Flex gap="md" justify="center" align="center" direction="row">
              <Text
                fz="lg"
                fw={400}
                style={{
                  verticalAlign: 'center',
                  alignItems: 'center'
                }}
              >
                {`${notCompletedNum} item(s) left`}
              </Text>
              <SegmentedControl
                onChange={val => {
                  setFilter(val as Filter)
                }}
                withItemsBorders={false}
                bg={'#ddd'}
                color={theme.colors.cyan[5]}
                size="sm"
                // size='input-sm'
                data={['All', 'Active', 'Completed']}
              />
            </Flex>
          </Paper>
        </div>
      )}
    </>
  )
}
