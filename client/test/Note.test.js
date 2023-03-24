import React from 'react'
import { render, screen } from '@testing-library/react'

import Note from '../src/pages/notes/Note'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Snapshop', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      state: 'store mock',
    })
  })

  test('Comprobamos el snapshots', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Note />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
