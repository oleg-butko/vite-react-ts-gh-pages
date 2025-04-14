import { useState, useEffect } from 'react'
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
const HOW_MANY_TODOS_GET_MAX = 10

async function apiGetAllTodos() {
  return fetch(`https://jsonplaceholder.typicode.com/todos`).then(res => res.json())
}

function App() {
  const [data, setData] = useState<Todo[]>(DATA)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    apiGetAllTodos()
      .then(res => {
        const newData: Todo[] = []
        for (let i = 0; i < Math.min(res.length, HOW_MANY_TODOS_GET_MAX); i++) {
          newData.push({ id: res[i].id, text: res[i].title, completed: res[i].completed })
        }
        setData(newData)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <MantineProvider>
      <h3>TODOs</h3>
      <div>{loading ? 'Loading...' : <Todos data={data} />}</div>
    </MantineProvider>
  )
}

export default App
