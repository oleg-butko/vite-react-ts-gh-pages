import { render, screen, mockFetch } from '@/lib/testing-utils'
import { waitFor } from '@testing-library/dom'
import { Todos } from './index'

const jsonplaceholderMock = [
  { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
  { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: true }
]

describe('Todos', () => {
  test('renders todos with mockFetch', async () => {
    window.fetch = mockFetch(jsonplaceholderMock)
    render(<Todos />)
    await waitFor(() => expect(screen.getByRole('textbox')).toBeInTheDocument())
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'What needs to be done?')
    expect(
      screen.getByRole('checkbox', { name: jsonplaceholderMock[0].title, checked: false })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: jsonplaceholderMock[1].title, checked: true })
    ).toBeInTheDocument()
    const todos = await screen.findAllByRole('checkbox')
    expect(todos).toHaveLength(2)
    expect(screen.getByText('1 item(s) left')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'All', checked: true })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Active', checked: false })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Completed', checked: false })).toBeInTheDocument()
  })
})
