import React, {PropTypes} from 'react'

import DeepEqual from '../deep-equal'
import Icon from '../icon'

export default class ModificationTitle extends DeepEqual {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    editModification: PropTypes.func.isRequired,
    modification: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    showOnMap: PropTypes.bool.isRequired,
    updateModification: PropTypes.func.isRequired
  }

  _toggleMapDisplay = (e) => {
    e.stopPropagation()
    const {modification, showOnMap, updateModification} = this.props
    updateModification({
      ...modification,
      showOnMap: !showOnMap
    })
  }

  _editModification = (e) => {
    this.props.editModification(this.props.modification)
  }

  render () {
    const {active, modification, showOnMap} = this.props
    const showIcon = showOnMap ? 'eye' : 'eye-slash'
    return (
      <div className={`ModificationTitle ${active ? 'active' : ''}`}>
        <a
          onClick={this._editModification}
          tabIndex={0}
          title='Edit Modification'>{modification.name}
        </a>
        <a
          className={`ShowOnMap pull-right ${showOnMap ? 'active' : 'dim'} fa-btn`}
          onClick={this._toggleMapDisplay}
          tabIndex={0}
          title='Toggle map display'
          ><Icon type={showIcon} />
        </a>
      </div>
    )
  }
}
