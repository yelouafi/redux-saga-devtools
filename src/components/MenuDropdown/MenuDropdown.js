import PropTypes from 'prop-types'
import React from 'react'
import { DockIcon } from './DockIcon'
import {
	MenuContainer,
	MenuButton,
	DropdownContainer,
	DropdownItem,
	Label,
} from './styles'

const positions = ['left', 'bottom', 'right']

class MenuDropdown extends React.Component {

	state = {
		open: false
	}

	toggleOpen = () => this.setState(({ open }) => ({ open: !open }))

	renderIcons = () => positions.map(position => (
		<DockIcon
			key={position}
			active={this.props.position === position}
			position={position}
			select={() => this.props.setPosition(position)}
		/>
	))

	render() {
		const { open } = this.state;

		return (
			<MenuContainer>
				<MenuButton onClick={this.toggleOpen}>...</MenuButton>
				{open &&
					<DropdownContainer>
						<DropdownItem>
							<Label>Dock side</Label>
							{this.renderIcons()}
						</DropdownItem>
					</DropdownContainer>
				}
			</MenuContainer>
		)
	}
}

MenuDropdown.propTypes = {
	position: PropTypes.string.isRequired,
	setPosition: PropTypes.func.isRequired,
}

export default MenuDropdown;