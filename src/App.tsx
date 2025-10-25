import { MantineProvider, Tabs, Container, Center } from '@mantine/core'

import { Text } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { Todos } from '@/components/Todos'
// styles
import '@mantine/core/styles.css'
import classes from './App.module.css'

function App() {
  const { height, width } = useViewportSize()
  return (
    <MantineProvider>
      <Center className={classes.fullHeight}>
        <Container mih={'80vh'} size="sm" p="md" style={{ height, width }}>
          <Tabs defaultValue="refresh">
            <Tabs.List>
              <Tabs.Tab value="refresh"> Test: (Auto refresh) + (Auto click)</Tabs.Tab>
              <Tabs.Tab value="todos">Todo(s)</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="refresh" pt="md">
              <Text size="sm" fw={500}>
                tab 1
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="todos" pt="md">
              <Todos />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Center>
    </MantineProvider>
  )
}

export default App
