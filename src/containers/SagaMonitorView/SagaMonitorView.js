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
  FilterEffect
} from './styles'

const EFFECT_VIEW = 'Effects'
const ACTION_VIEW = 'Actions'

const OPTION_WIDTH = 80
const OPTION_STYLE = { width: OPTION_WIDTH }

class SagaMonitorView extends React.Component {

  state = {
    currentView: EFFECT_VIEW,
    currentViewIndex: 0,
    filter: { word: '', type: undefined }
  }

  viewHandlers = {
    [EFFECT_VIEW]: () => this.setState({ currentView: EFFECT_VIEW, currentViewIndex: 0 }),
    [ACTION_VIEW]: () => this.setState({ currentView: ACTION_VIEW, currentViewIndex: 1 })
  }

  updateFilter = () => this.setState(({ filter }) => (
    { filter: { ...filter, word: this.filter.value } }
  ))

  renderCurrentView() {
    switch (this.state.currentView) {
      case EFFECT_VIEW:
        return <EffectView rootEffectIds={this.props.rootEffectIds} filter={this.state.filter} />
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
                innerRef={filter => this.filter = filter}
                placeholder="filter..."
              />
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
