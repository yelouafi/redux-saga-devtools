import styled from 'styled-components'

export const MenuContainer = styled.div`
	position: absolute;
	top: 0;
	right: 55px;
	margin: 3px;
	z-index: 1;
	font-family: helvetica;
	font-size: 14px;
	color: rgb(33,33,33);
`

export const MenuButton = styled.button`
	position: absolute;
	right: 0;
	top: 0;
`

export const DropdownContainer = styled.div`
	position: absolute;
	top: 30px;
	right: 0;
	width: 250px;
	background: white;
	border: 1px solid rgba(0,0,0,.2);
	box-shadow: 0 5px 10px rgba(0,0,0,.3);
`

export const DropdownItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid rgb(240,240,240);
`

export const Label = styled.div`
	flex-grow: 1;
`
