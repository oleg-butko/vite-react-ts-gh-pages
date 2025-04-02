import { useState } from 'react'
import { IconArrowRight, IconAddressBook } from '@tabler/icons-react'
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core'

type Props = {
	addTodoCallback: (text: string) => void
}

export function InputWithButton(props: Props) {
	const [value, setValue] = useState('')
	const theme = useMantineTheme()
	return (
		<TextInput
			radius='xl'
			size='md'
			placeholder='What needs to be done?'
			rightSectionWidth={42}
			leftSection={<IconAddressBook size={18} stroke={1.5} />}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					props.addTodoCallback(value)
					setValue('')
				}
			}}
			value={value}
			onChange={(event) => setValue(event.target.value)}
			rightSection={
				<ActionIcon size={32} radius='xl' color={theme.primaryColor}>
					<IconArrowRight
						onClick={() => {
							props.addTodoCallback(value)
							setValue('')
						}}
						size={18}
						stroke={1.5}
					/>
				</ActionIcon>
			}
		/>
	)
}
