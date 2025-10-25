// import { useState, useEffect } from 'react'
// import { Checkbox, SegmentedControl, Text, Space, useMantineTheme } from '@mantine/core'
// import type { Todo } from '@/types/todo'
// import { Paper, Flex } from '@mantine/core'
// import { useIsFirstRender } from '@mantine/hooks'
// import { useDidUpdate } from '@mantine/hooks'

import { useState, useEffect } from 'react'
import { NumberInput, Text, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage, readLocalStorageValue } from '@mantine/hooks'

const LSKEY_INITIAL_SECONDS = 'initialSeconds'
let initialSecondsOnLoad = readLocalStorageValue({ key: LSKEY_INITIAL_SECONDS })

export function AutoRefreshAndClickTest() {
  const [initialSeconds, setInitialSeconds] = useLocalStorage({
    key: LSKEY_INITIAL_SECONDS
  })
  const [secondsLeft, setSecondsLeft] = useState('-')
  const [showElements, setShowElements] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    console.log('useEffect1, secondsLeft:', secondsLeft, 'initialSeconds:', initialSeconds)
    if (secondsLeft === '-' && initialSeconds) {
      setSecondsLeft(initialSeconds)
    }
    if (!initialSecondsOnLoad) {
      initialSecondsOnLoad = 1
      setInitialSeconds('5')
    }
  }, [initialSeconds, setInitialSeconds, secondsLeft])

  useEffect(() => {
    console.log('useEffect2, secondsLeft:', secondsLeft)
    if (secondsLeft === '-') {
      return
    }
    if (parseInt(secondsLeft, 10) <= 0) {
      setShowElements(true)
      return
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        const newSeconds = parseInt(prev, 10)
        if (newSeconds <= 1) {
          setShowElements(true)
          return '0'
        }
        return (newSeconds - 1).toString()
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1)
  }

  return (
    <Stack>
      <Group>
        <NumberInput
          maw={80}
          label="Delay:"
          value={initialSeconds || '5'}
          onChange={value => setInitialSeconds(value.toString())}
          min={1}
          max={59}
        />
        <Text style={{ alignSelf: 'flex-end', marginBottom: 5 }}>Remaining: {secondsLeft}</Text>
      </Group>

      {showElements && <Text size="lg">Text shown after delay</Text>}

      {showElements && (
        <Group>
          <Button onClick={handleButtonClick} variant="filled" color="teal">
            Button to click
          </Button>
          <Text>Clicked: {clickCount}</Text>
        </Group>
      )}
    </Stack>
  )
}
