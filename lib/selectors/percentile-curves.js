import {createSelector} from 'reselect'

const MAX_TRIP_DURATION = 120

/** percentile curves data is just an array of cumulative accessibility curves for different percentiles. */
export function computePercentileCurves (travelTimeSurface, destinationGrid) {
  if (travelTimeSurface == null || destinationGrid == null) return null

  const percentileCurves = []

  // percentileIndex may not be the same as the percentile as there may not be 100 percentiles in the data
  for (let percentileIndex = 0; percentileIndex < travelTimeSurface.nSamples; percentileIndex++) {
    const dataThisPercentile = []
    for (let i = 0; i < MAX_TRIP_DURATION; i++) dataThisPercentile.push(0)

    for (let y = 0; y < destinationGrid.height; y++) {
      const travelTimeY = y + destinationGrid.north - travelTimeSurface.north
      if (travelTimeY < 0 || travelTimeY >= travelTimeSurface.height) continue
      for (let x = 0; x < destinationGrid.width; x++) {
        const travelTimeX = x + destinationGrid.west - travelTimeSurface.west
        if (travelTimeX < 0 || travelTimeX >= travelTimeSurface.width) continue
        const travelTime = travelTimeSurface.get(travelTimeX, travelTimeY)[percentileIndex]
        if (travelTime >= MAX_TRIP_DURATION) continue
        // dataThisPercentile[i] is the marginal accessibility from minute i to minute i + 1.
        // travel times are floored from seconds to minutes on the server so just using the floored
        // value as an index directly is correct.
        dataThisPercentile[travelTime] += destinationGrid.data[y * destinationGrid.width + x]
      }
    }

    // make non-cumulative
    for (let i = 1; i < dataThisPercentile.length; i++) {
      dataThisPercentile[i] += dataThisPercentile[i - 1]
    }

    percentileCurves.push(dataThisPercentile)
  }

  return percentileCurves
}

const percentileCurves = createSelector(
  state => state.analysis.travelTimeSurface,
  state => state.analysis.destinationGrid,
  computePercentileCurves
)

export default percentileCurves
