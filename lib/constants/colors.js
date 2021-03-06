/** Colors for scenario editor, pulled out as constants in one place */

/** Colors used across the scenario editor */

const colors = {
  /** removed things are red */
  REMOVED: '#b66',

  /** added things are blue (not green as red/green color blindness is very common) */
  ADDED: '#55b',

  /** edited things are purple, because it's @mattwigway's favorite color */
  MODIFIED: '#d6d',

  /** active things (i.e. the user is hovering their mouse over them) are green */
  ACTIVE: '#4a4',

  /** neutral things are gray */
  NEUTRAL: '#747880',

  /** The color of the isochrone */
  SCENARIO_ISOCHRONE_COLOR: '#2389c9',

  /** When performing a comparison, the color of the comparison isochrone */
  COMPARISON_ISOCHRONE_COLOR: '#f42727',

  /** The color of stale isochrones (invalidated by parameter changes) */
  STALE_ISOCHRONE_COLOR: '#ababab',

  /** The color of the stacked percentile plot for the scenario being analyzed */
  SCENARIO_PERCENTILE_COLOR: '#2043f9',

  /** The color of the stacked percentile plot for the scenario being compared against */
  COMPARISON_PERCENTILE_COLOR: '#ff2b2b',

  /** The color of a stacked percentile plot invalidated by parameter changes */
  STALE_PERCENTILE_COLOR: '#a8a8a8',

  /** Color of the dot density maps */
  OPPORTUNITY_COLOR: '#b4c248',

  /** Color gradient for regional analysis results, blues from Colorbrewer */
  REGIONAL_GRADIENT: [
    'rgba(241, 237, 246, 0.42)',
    'rgba(188, 200, 224, 0.42)',
    'rgba(116, 169, 207, 0.42)',
    'rgba(43, 140, 190, 0.42)',
    'rgba(4, 90, 142, 0.42)'
  ],

  /** Color gradient for regional analysis comparisons */
  REGIONAL_COMPARISON_GRADIENT: [
    'rgba(215, 25, 28, 0.42)',
    'rgba(252, 174, 97, 0.42)',
    'rgba(255, 255, 191, 0.42)',
    'rgba(171, 217, 233, 0.42)',
    'rgba(44, 123, 182, 0.42)'
  ]
}

export default colors
