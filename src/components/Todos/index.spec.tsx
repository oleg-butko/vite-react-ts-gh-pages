import { render, screen } from '@/lib/testing-utils'
import type { Todo } from '@/types/todo'
import { Todos } from './index'

const DATA: Todo[] = [
  { id: 'todo-1', text: 'todo-1-text', completed: false },
  { id: 'todo-2', text: 'todo-2-text', completed: false },
  { id: 'todo-3', text: 'todo-3-text', completed: true }
]

describe('Todos', () => {
  test('renders todos', async () => {
    render(<Todos data={DATA} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'What needs to be done?')
    expect(
      screen.getByRole('checkbox', { name: 'todo-1-text', checked: false })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'todo-2-text', checked: false })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'todo-3-text', checked: true })
    ).toBeInTheDocument()
    const todos = await screen.findAllByRole('checkbox')
    expect(todos).toHaveLength(3)
    expect(screen.getByText('2 item(s) left')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'All', checked: true })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Active', checked: false })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Completed', checked: false })).toBeInTheDocument()
  })
})
