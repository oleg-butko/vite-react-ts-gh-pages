import { useState, useEffect } from 'react'
import { Checkbox, SegmentedControl, Text, Space, useMantineTheme } from '@mantine/core'
import type { Todo, TodoAPI } from '@/types/todo'
import { Paper, Flex } from '@mantine/core'
import { useIsFirstRender, useLocalStorage } from '@mantine/hooks' // useDidUpdate
import { InputWithButton } from '@/components/InputWithButton'

type Filter = 'All' | 'Active' | 'Completed'

// cache for apiGetAllTodos request
const LSKEY_JSON_API = 'jsonDataApiCache'
const DEFAULT_DATA: Todo[] = [
  { id: 'todo-1', text: 'text 1', completed: false },
  { id: 'todo-2', text: 'text 2', completed: true },
  { id: 'todo-3', text: 'text 3', completed: false }
]
const HOW_MANY_TODOS_GET_MAX = 10

async function apiGetAllTodos() {
  return fetch(`https://jsonplaceholder.typicode.com/todos`).then(res => res.json())
}

export function Todos() {
  const [jsonDataLS, setJsonDataLS] = useLocalStorage<TodoAPI[]>({
    key: LSKEY_JSON_API,
    getInitialValueInEffect: false
  })
  const [todosList, setTodosList] = useState<Todo[]>(DEFAULT_DATA)
  const theme = useMantineTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadedOnce, setLoadedOnce] = useState<boolean>(false)
  const [filter, setFilter] = useState<Filter>('All')
  const [visibleTodos, setVisibleTodos] = useState(todosList)
  const notCompletedNum = todosList.filter(todo => !todo.completed).length
  const firstRender = useIsFirstRender()

  const prepareTodos = (data: TodoAPI[]): Todo[] => {
    const newData: Todo[] = []
    const dataTodos = data as TodoAPI[]
    const iMax =
      dataTodos.length > HOW_MANY_TODOS_GET_MAX ? HOW_MANY_TODOS_GET_MAX : dataTodos.length
    for (let i = 0; i < iMax; i++) {
      newData.push({
        id: `todo-${dataTodos[i].id}`,
        text: dataTodos[i].title,
        completed: dataTodos[i].completed
      })
    }
    return newData
  }

  // useDidUpdate(() => { // Will not be called when mounted
  useEffect(() => {
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
    if (jsonDataLS) {
      setTodosList(prepareTodos(jsonDataLS))
      setLoading(false)
    } else if (!loadedOnce) {
      apiGetAllTodos()
        .then(res => {
          setJsonDataLS(res)
          setTodosList(prepareTodos(res))
          setLoadedOnce(true)
        })
        .finally(() => setLoading(false))
    }
  }, [firstRender, loadedOnce, setJsonDataLS, jsonDataLS])

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
