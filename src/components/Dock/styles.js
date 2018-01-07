import styled, { css } from 'styled-components'

const resizeLeft = css`
  left: -5px;
  width: 10px;
  top: 0;
  height: 100%;
`

const resizeRight = css`
  right: -5px;
  width: 10px;
  top: 0;
  height: 100%;
`

const resizeTop = css`
  top: -5px;
  height: 10px;
  left: 0;
  width: 100%;
`

export const cssResize = (pos) => css`
  position: absolute;
  opacity: 0;
  cursor: col-resize;
  ${pos === 'right' ? resizeLeft :
    pos === 'left' ? resizeRight :
    resizeTop // pos === 'bottom'
  }
`

export const DockContainer = styled.div`
  position: fixed;
  width: 0px;
  height: 0px;
  top: 0px;
  left: 0px;
  z-index: 99999999;
`

export const DockOverlay = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 0;
  background: rgba(0, 0, 0, 0);
  opacity: 1;
  pointer-events: none;
`

export const DockToggle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 3px;
`

export const DockPanel = styled.div`
  position: fixed;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 4px;
  background: white;
  bottom: 0;

  ${p => p.position === 'bottom' ?
      css`
        left: 0;
        height: 400px;
      `:
    p.position === 'left' ?
      css`
        left: 0;
        height: 100%;
      `:
    // p.position === 'right'
      css`
        right: 0;
        height: 100%;
      `
	}

  ${p => p.resizing ?
      css`
        border-left: 1px solid rgb(200,200,200);
      ` :
      css`
        transition: width 0.1s ease-out;
      `
  }
`

export const DockPanelBody = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
