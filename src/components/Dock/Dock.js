import React from 'react'
import Divider, { VERTICAL, HORIZONTAL } from '../Divider'
import MenuDropdown from '../MenuDropdown'
import { IconMenu } from '../Icons'
import {
    cssResize,
    DockContainer,
    DockOverlay,
    DockToggle,
    DockPanel,
    DockPanelBody
} from './styles'

const KEY_CODE_F9=120

class Dock extends React.Component {

    node = null

    state = {
        visible: true,
        width: 500,
        isResizing: false,
        position: 'right'
    }

    handleKeyUp = (e) => ((e.keyCode === KEY_CODE_F9) ? this.onToggleDock() : null)  //F9

    componentDidMount = () => document.addEventListener('keyup', this.handleKeyUp)

    componentWillUnmount = () => document.removeEventListener('keyup', this.handleKeyUp)

    onToggleDock = () => {
        this.setState(state => {
            return {visible: !state.visible}
        })
    }

    setPosition = (position) => this.setState({ position })

    onResizeStart = () => {
        this.widthOrigin = this.state.width
        this.setState({isResizing: true})
    }

    onResizeEnd = e => {
        this.setState({isResizing: false})
    }

    onResize = deltaX => {
        if (this.state.position === 'left') deltaX = -deltaX

        this.setState(state => {
            return {
                width: Math.max(0, this.widthOrigin + deltaX)
            }
        })
    }

    render() {
        let width, height

        switch (this.state.position) {
            case 'right':
            case 'left':
                width = this.state.width
                height = '100%'
                break;
            case 'bottom':
                width = '100%'
                height = this.state.width
        }

        const style = {
            width: this.state.visible ? width : 0,
            height: this.state.visible ? height : 0
        }

        return (
            <DockContainer>
                <DockPanel
                    resizing={this.state.isResizing}
                    style={style}
                    position={this.state.position}
                >
                    <DockOverlay />
                    <MenuDropdown
                        position={this.state.position}
                        setPosition={this.setPosition}
                    />
                    {this.state.visible ? <DockToggle onClick={this.onToggleDock}>Toggle</DockToggle> : null}
                    <Divider
                        css={cssResize(this.state.position)}
                        onResizeStart={this.onResizeStart}
                        onResize={this.onResize}
                        onResizeEnd={this.onResizeEnd}
                        orientation={this.state.position === 'bottom' ? HORIZONTAL : VERTICAL}
                    />
                    <DockPanelBody>
                        {this.props.children}
                    </DockPanelBody>
                </DockPanel>
            </DockContainer>
        )
    }
}

export default Dock
