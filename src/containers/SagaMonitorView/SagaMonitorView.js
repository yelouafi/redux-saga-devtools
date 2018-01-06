import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { Row, Cell } from '../../components/Layout'
import Dock from '../../components/Dock'
import EffectView from '../EffectView'
import ActionView from '../ActionView'
import {
  SagaMonitorContainer,
  SagaMonitorHeader,
  SagaMonitorOption,
  SagaMonitorBody,
  FilterEffect,
  FilterDropdown,
  FilterOption
} from './styles'

const EFFECT_VIEW = 'Effects'
const ACTION_VIEW = 'Actions'

const OPTION_WIDTH = 80
const OPTION_STYLE = { width: OPTION_WIDTH }

class SagaMonitorView extends React.Component {

  state = {
    currentView: EFFECT_VIEW,
    currentViewIndex: 0,
    filter: { word: '', type: undefined },
    filterOptions: []
  }

  viewHandlers = {
    [EFFECT_VIEW]: () => this.setState({ currentView: EFFECT_VIEW, currentViewIndex: 0 }),
    [ACTION_VIEW]: () => this.setState({ currentView: ACTION_VIEW, currentViewIndex: 1 })
  }

  updateFilter = () => this.setState(({ filter }) => (
    { filter: { word: this.filterWord.value, type: this.filterType.value } }
  ))

  setFilterOptions = (items, { allCaps }) => {
    const options = items.map(item => {
      let label, value

      if(typeof item === 'object') {
        label = item.option || item.value
        value = item.value
      }
      else if(typeof item === 'string') {
        label = item
        value = item
      }

      if (allCaps) label = label.toUpperCase()

      return { label, value }

    })
  
    this.setState({ filterOptions: options })
  }

  renderFilterOptions = () => this.state.filterOptions.map(option => {
    return <FilterOption key={option.value} value={option.value}>{option.label}</FilterOption>
  })

  renderCurrentView() {
    switch (this.state.currentView) {
      case EFFECT_VIEW:
        return <EffectView
          rootEffectIds={this.props.rootEffectIds}
          filter={this.state.filter}
          setFilterOptions={this.setFilterOptions}
        />
      case ACTION_VIEW:
        return <ActionView />
      default:
        return 'Unknown View!'
    }
  }

  renderViewOption(view) {
    return (
      <Cell>
        <SagaMonitorOption
          style={OPTION_STYLE}
          onMouseDown={this.viewHandlers[view]}
        >
          {view}
        </SagaMonitorOption>
      </Cell>
    )
  }

  render() {
    return (
      <Dock>
        <SagaMonitorContainer>
          <SagaMonitorHeader>
            <Row>
              {this.renderViewOption(EFFECT_VIEW)}
              {this.renderViewOption(ACTION_VIEW)}
              <FilterEffect
                onChange={this.updateFilter}
                innerRef={filter => this.filterWord = filter}
                placeholder="filter..."
              />
              <FilterDropdown
                onChange={this.updateFilter}
                innerRef={filter => this.filterType = filter}
              >
                <FilterOption value="">none</FilterOption>
                {this.renderFilterOptions()}
              </FilterDropdown>
              <hr style={{ width: OPTION_WIDTH, left: OPTION_WIDTH * this.state.currentViewIndex }} />
            </Row>
          </SagaMonitorHeader>
          <SagaMonitorBody>
            {this.renderCurrentView()}
          </SagaMonitorBody>
        </SagaMonitorContainer>
      </Dock>
    )
  }
}

SagaMonitorView.propTypes = {
  rootEffectIds: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    rootEffectIds: state.rootEffectIds
  })
)(SagaMonitorView)
