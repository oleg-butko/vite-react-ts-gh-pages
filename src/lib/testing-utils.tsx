//
// https://mantine.dev/guides/jest/
//
import userEvent from '@testing-library/user-event'
import { render as testingLibraryRender } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

// import { theme } from '../src/theme';
// <MantineProvider theme={theme}>{children}</MantineProvider>

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>{children}</MantineProvider>
    )
  })
}
export * from '@testing-library/react' // eslint-disable-line
export { userEvent }

// eslint-disable-next-line
export function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  )
}
