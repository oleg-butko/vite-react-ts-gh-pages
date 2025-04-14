import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.css'
import { Todos } from '@/components/Todos'

function App() {
  return (
    <MantineProvider>
      <h3>TODOs</h3>
      <Todos />
    </MantineProvider>
  )
}

export default App
