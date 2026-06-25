import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createTestStore, type TestState } from './createTestStore'

export function renderWithStore(
  ui: ReactElement,
  preloadedState?: Partial<TestState>,
) {
  const store = createTestStore(preloadedState)
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  }
}
