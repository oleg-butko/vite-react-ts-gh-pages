import { IconArrowRight, IconAddressBook } from '@tabler/icons-react'
import {
	ActionIcon,
	TextInput,
	TextInputProps,
	useMantineTheme
} from '@mantine/core'

export function InputWithButton(props: TextInputProps) {
	const theme = useMantineTheme()

	return (
		<TextInput
			radius='xl'
			size='md'
			placeholder='What needs to be done?'
			rightSectionWidth={42}
			leftSection={<IconAddressBook size={18} stroke={1.5} />}
			rightSection={
				<ActionIcon
					size={32}
					radius='xl'
					color={theme.primaryColor}
					variant='filled'>
					<IconArrowRight size={18} stroke={1.5} />
				</ActionIcon>
			}
			{...props}
		/>
	)
}
