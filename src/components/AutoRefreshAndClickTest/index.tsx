import { useState, useEffect } from 'react'
import { NumberInput, Text, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage, readLocalStorageValue } from '@mantine/hooks'
import classes from './index.module.css'

const LSKEY_INITIAL_SECONDS = 'initialSeconds'
let initialSecondsOnLoad = readLocalStorageValue({ key: LSKEY_INITIAL_SECONDS })

export function AutoRefreshAndClickTest() {
  const [initialSeconds, setInitialSeconds] = useLocalStorage({
    key: LSKEY_INITIAL_SECONDS
  })
  const [secondsLeft, setSecondsLeft] = useState('-')
  const [showElements, setShowElements] = useState(false)
  const [clickCount1, setClickCount1] = useState(0)
  const [clickCount2, setClickCount2] = useState(0)

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

  const handleButton1Click = () => {
    setClickCount1(prev => prev + 1)
  }
  const handleButton2Click = () => {
    setClickCount2(prev => prev + 1)
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

      <Group>
        {showElements && <Text size="sm">Text1 shown after delay</Text>}
        <Text className={showElements ? classes.visible : classes.hidden} size="sm">
          Text2 visible after delay
        </Text>
      </Group>

      {showElements && (
        <Group gap={'20px'}>
          <Button
            className={'button_1'}
            onClick={handleButton1Click}
            variant="filled"
            color="teal"
          >
            Button_1 to click
          </Button>
          <Text className={'text_1'}>Clicked: {clickCount1}</Text>
          <Button
            className={'button_2'}
            onClick={handleButton2Click}
            variant="filled"
            color="indigo"
          >
            Button_2 to click
          </Button>
          <Text className={'text_2'}>Clicked: {clickCount2}</Text>
        </Group>
      )}
    </Stack>
  )
}
