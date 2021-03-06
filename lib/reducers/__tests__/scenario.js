/* globals describe, expect, it */

import { handleActions } from 'redux-actions'

import * as scenario from '../scenario'

describe('reducers > scenario', () => {
  const reducer = handleActions(scenario.reducers, scenario.initialState)
  const mockIdObject = { id: '1' }
  const mockModification = { id: '1', type: 'adjust-dwell-time' }

  // Default State Test
  it('should handle default state', () => {
    expect(reducer(undefined, { type: 'blah', payload: {} })).toMatchSnapshot()
  })

  // Specific Handler Tests
  it('should handle add bundle', () => {
    const action = { type: 'add bundle', payload: mockIdObject }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle add scenario', () => {
    const action = { type: 'add scenario', payload: mockIdObject }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle delete bundle', () => {
    const action = { type: 'delete bundle', payload: '1' }
    const beginState = { bundles: [mockIdObject] }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle delete modification', () => {
    const action = { type: 'delete modification', payload: '1' }
    const beginState = { modificationsById: { '1': mockModification } }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle delete scenario', () => {
    const action = { type: 'delete scenario', payload: '1' }
    const beginState = { scenariosById: { '1': mockIdObject } }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle log out', () => {
    expect(reducer(undefined, { type: 'log out', payload: {} })).toMatchSnapshot()
  })

  it('should handle set bundle', () => {
    const action = { type: 'set bundle', payload: '1' }
    const beginState = {
      bundlesById: {
        '1': mockIdObject
      },
      currentScenario: {}
    }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle set bundles', () => {
    const action = { type: 'set bundles', payload: [mockIdObject] }
    const beginState = {
      currentScenario: {
        bundleId: '1'
      }
    }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle set feeds', () => {
    const action = { type: 'set feeds', payload: [mockIdObject] }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle set modification', () => {
    const action = { type: 'set modification', payload: mockModification }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle set modifications', () => {
    const action = { type: 'set modifications', payload: [mockModification] }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle set scenario', () => {
    const mockScenario = { id: '1', bundleId: '1' }
    const action = { type: 'set scenario', payload: mockScenario }
    const beginState = { bundlesById: { '1': mockIdObject } }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle set scenarios', () => {
    const action = { type: 'set scenarios', payload: [mockIdObject] }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle show variant', () => {
    const action = { type: 'show variant', payload: 1 }
    const beginState = {
      modifications: [
        {
          id: '1',
          variants: [],
          type: 'adjust-dwell-time'
        }
      ]
    }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle update variant', () => {
    const action = { type: 'update variant', payload: { index: 0, value: 'foo' } }
    const beginState = { variants: ['bar'] }
    expect(reducer(beginState, action)).toMatchSnapshot()
  })

  it('should handle update variants with null payload', () => {
    const action = { type: 'update variants', payload: null }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })

  it('should handle update variants with acceptable payload', () => {
    const action = { type: 'update variants', payload: ['foo'] }
    expect(reducer(undefined, action)).toMatchSnapshot()
  })
})
