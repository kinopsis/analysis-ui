/** export a reroute modification */

import assert from 'assert'

import {feedScopeIds} from './'
import getHopTimes from '../get-hop-times'
import getStops from '../get-stops'

export default function convertReroute ({
  dwellTime,
  dwellTimes,
  feed,
  fromStop,
  routes,
  segments,
  segmentSpeeds,
  toStop,
  trips
}) {
  // feed-scope IDs
  const fromStopId = fromStop ? `${feed}:${fromStop}` : null
  const toStopId = toStop ? `${feed}:${toStop}` : null
  let feedScopedPatterns, feedScopedRoutes
  if (trips) {
    feedScopedPatterns = feedScopeIds(feed, trips)
  } else {
    feedScopedRoutes = feedScopeIds(feed, routes)
  }

  const segmentStops = getStops(segments)
  const stops = segmentStops.map((stop) => {
    // already feed scoped
    if (stop.stopId) {
      return { id: stop.stopId }
    } else {
      return {
        lat: stop.lat,
        lon: stop.lon
      }
    }
  })

  // don't include from and to stop in modification
  if (fromStop) {
    const stop = stops.shift()
    assert(stop.id === fromStopId, 'First stop in reroute is not fromStop!')
  }

  if (toStop) {
    const stop = stops.pop()
    assert(stop.id === toStopId, 'Last stop in reroute is not toStop!')
  }

  const hopTimes = getHopTimes(segmentStops, segmentSpeeds)

  // There should be one more dwell time than hop time. The number of hop times depends on fromStop and toStop.
  let realStopIndex = 0
  const allDwellTimes = segmentStops.map((stop) => {
    if (stop.autoCreated || !dwellTimes) return dwellTime
    const specificDwellTime = parseInt(dwellTimes[realStopIndex++])
    return isNaN(specificDwellTime) ? dwellTime : specificDwellTime
  })

  return {
    fromStop: fromStopId,
    dwellTimes: allDwellTimes,
    hopTimes,
    patterns: feedScopedPatterns,
    routes: feedScopedRoutes,
    stops,
    toStop: toStopId,
    type: 'reroute'
  }
}
