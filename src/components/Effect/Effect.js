import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { is, asEffect } from 'redux-saga/utils'
import { Row, Cell } from '../Layout'
import SagaValue from '../SagaValue'
import Result from './Result'


const EffectType = styled.span`
  color: rgb(28, 0, 207);
  margin-right: 5px;
`


/* eslint-disable no-cond-assign */
class Effect extends React.Component {

  effectId = this.props.effect.effectId

  highlightFilter = (text) => {
    const highlight = this.props.filter
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

    return <span>{parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', background: '#ffcc00' } : {} }>
            {part}
        </span>)
    } </span>
  }

  renderResult(status, result, error, winner) {
    return <Result status={status} result={result} error={error} winner={winner} />
  }

  render() {
    const {effect, filter} = this.props
    const { status, result, error, winner } = effect

    let nodes = []
    let data

    if(effect.root) {
      nodes = nodes.concat(
        renderFuncCall(effect.effect.saga, effect.effect.args, this.highlightFilter),
        this.renderResult(status, result, error)
      )
    }

    else if((data = asEffect.take(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('take'),
        <SagaValue
          value={data.pattern || data.channel}
          isIdentifier={true}
          highlighter={this.highlightFilter}
        />,
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.put(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('put'),
        <SagaValue
          value={data.channel || data.action}
          label={data.action.type}
          isIdentifier={true}
          highlighter={this.highlightFilter}
        />
      )
    }

    else if((data = asEffect.call(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('call'),
        renderFuncCall(data.fn, data.args, this.highlightFilter),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.cps(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('cps'),
        renderFuncCall(data.fn, data.args),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.fork(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('fork'),
        renderFuncCall(data.fn, data.args, this.highlightFilter),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.join(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('join'),
        <SagaValue
          value={data}
          isIdentifier={true}
          label={data.name}
          highlighter={this.highlightFilter}
        />,
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.cancel(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('cancel'),
        <SagaValue
          value={data}
          isIdentifier={true}
          label={data.name}
          highlighter={this.highlightFilter}
        />,
      )
    }

    else if(is.array(effect.effect)) {
      nodes = nodes.concat(
        renderEffectType('parallel'),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.race(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('race'),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.select(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('select'),
        renderFuncCall(data.selector, data.args, this.highlightFilter),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.actionChannel(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('actionChannel'),
        <SagaValue
          value={data.action}
          isIdentifier={true}
          highlighter={this.highlightFilter}
        />,
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.cancelled(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('cancelled(?)'),
        this.renderResult(status, result, error, winner)
      )
    }

    else if((data = asEffect.flush(effect.effect))) {
      nodes = nodes.concat(
        renderEffectType('flush'),
        renderFuncCall(data),
        this.renderResult(status, result, error, winner)
      )
    }

    else if(is.iterator(effect.effect)) {
      nodes = nodes.concat(
        renderEffectType(effect.effect.name),
        this.renderResult(status, result, error, winner)
      )
    }

    else {
      nodes = nodes.concat(
        renderEffectType('Unknown'),
        this.renderResult(status, result, error, winner),
      )
    }

    return renderEffect(effect, status, nodes)
  }
}

function renderEffect(effect, status, nodes) {
  return (
    <Row>
      {nodes.map((node, idx) => (
        <Cell key={idx}>
          {node}
        </Cell>
      ))}
    </Row>
  )
}

function renderEffectType(type) {
  return (
    <EffectType>{type}</EffectType>
  )
}

function renderFuncCall(fn, args, highlighter = val => val) {
  if(!args.length) {
    return <span>{highlighter(fn.name)}()</span>
  }

  return [
    <span>{highlighter(fn.name)}(</span>,
    ...renderFuncArgs(args),
    <span>)</span>
  ]
}

function renderFuncArgs(args) {
  const elements = []
  args.forEach((arg, idx) => {
    elements.push(<SagaValue value={arg}/>)
    if(idx < args.length - 1) {
      elements.push(<span>, </span>)
    }
  })
  return elements
}

Effect.propTypes = {
  effect: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
}

export default Effect
