import React, {PropTypes} from 'react'
import Select from 'react-select'

import {Button} from './buttons'
import DeepEqualComponent from './deep-equal'
import Icon from './icon'
import {Group as FormGroup, Text} from './input'
import {Body, Heading, Panel} from './panel'
import messages from '../utils/messages'

export default class EditScenario extends DeepEqualComponent {
  static propTypes = {
    bundleId: PropTypes.string,
    bundleName: PropTypes.string,
    bundles: PropTypes.array.isRequired,
    id: PropTypes.string,
    isEditing: PropTypes.bool.isRequired,
    name: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    variants: PropTypes.array,

    close: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    deleteScenario: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  }

  state = {
    bundleId: this.props.bundleId,
    name: this.props.name
  }

  componentWillReceiveProps (newProps) {
    this.setState({bundleId: newProps.bundleId, name: newProps.name})
  }

  _createOrSave = () => {
    const {close, create, id, isEditing, projectId, variants, save} = this.props
    const {bundleId, name} = this.state
    if (name && bundleId) {
      if (isEditing) {
        save({bundleId, id, name, projectId, variants})
        close()
      } else {
        create({
          bundleId,
          name,
          projectId,
          variants
        })
      }
    }
  }

  _deleteScenario = () => {
    if (window.confirm(messages.scenario.deleteConfirmation)) {
      const {deleteScenario, id, projectId} = this.props
      deleteScenario({
        scenarioId: id,
        projectId
      })
    }
  }

  _goToCreateBundle = () =>
    this.props.goToCreateBundle(this.props.projectId)

  render () {
    const {bundleName, bundles, isEditing} = this.props
    const {bundleId, name} = this.state
    const readyToCreate = name && name.length > 0 && bundleId && bundleId.length > 0
    return (
      <Panel>
        <Heading>{isEditing ? messages.scenario.editTitle : messages.scenario.createAction}</Heading>
        <Body>
          <Text
            name='Scenario name'
            onChange={(e) => this.setState({ ...this.state, name: e.target.value })}
            value={name}
            />
          {isEditing &&
            <FormGroup><strong>Bundle:</strong> {bundleName} <br /><small>Bundle cannot be changed once a scenario is created</small></FormGroup>
          }
          {!isEditing &&
            <FormGroup id='select-bundle'>
              <Select
                clearable={false}
                id='select-bundle'
                options={bundles.map((bundle) => { return { value: bundle.id, label: bundle.name } })}
                onChange={(option) => this.setState({...this.state, bundleId: option.value})}
                placeholder='Select a bundle...'
                value={bundleId}
                />
            </FormGroup>
          }
          {!isEditing &&
            <Button
              block
              onClick={this._goToCreateBundle}
              style='success'
              ><Icon type='plus' /> {messages.bundle.create}
            </Button>
          }
          <Button
            block
            disabled={!readyToCreate}
            onClick={this._createOrSave}
            style='success'
            >{isEditing ? messages.scenario.editAction : messages.scenario.createAction}
          </Button>
          {isEditing &&
            <Button
              block
              onClick={this._deleteScenario}
              style='danger'
              ><Icon type='trash' /> {messages.scenario.delete}
            </Button>
          }
        </Body>
      </Panel>
    )
  }
}
