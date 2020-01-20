import PropTypes from 'prop-types';
import React from 'react'
import styled, { css } from 'styled-components'

const IconWrapper = styled.div`
	padding: 5px;
	margin: 0 5px;
	${p => p.active ? css`background-color: #DDDDDD`: ''};

	&:hover {
		cursor: pointer;
	}
`

const IconOutline = styled.div`
	position: relative;
	width: 15px;
	height: 10px;
	border: 2px solid #888888;
`

const IconInner = styled.div`
	position: absolute;
	width: ${p => p.position === 'bottom' ? '100%' : '40%'};
	height: ${p => p.position === 'bottom' ? '40%' : '100%'};
	bottom: 0;
	background-color: #888888;
	${p => p.position === 'bottom' || p.position === 'left' ?
			css`
				left: 0;
			`:
			css`
				right: 0;
			`
	}
`

export const DockIcon = ({ active, position, select }) => (
	<IconWrapper active={active} onClick={select}>
		<IconOutline>
			<IconInner position={position} />
		</IconOutline>
	</IconWrapper>
)

DockIcon.propTypes = {
	active: PropTypes.bool.isRequired,
	position: PropTypes.string.isRequired,
	select: PropTypes.func.isRequired
}