import styled from 'styled-components'

export const SagaMonitorContainer = styled.div`
  font-family: monospace;
  font-size: 13px;
  color: rgb(33,33,33);
  height: 100%;
  width: 100%;

  & * {
    box-sizing: border-box;
  }

  & [hidden] {
    visibility: hidden;
  }
`

export const SagaMonitorHeader = styled.section`
  background-color: rgb(243, 243, 243);
  border-bottom: 1px solid rgb(204, 204, 204);
  position: relative;

  & hr {
    background-color: rgb(56, 121, 217);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    border: none;
    height: 2px;
    margin: 0;
    position: absolute;
    bottom: -1px;
    transition: .2s ease-in-out;
  }
`

export const SagaMonitorOption = styled.div`
  padding: 5px 10px;
  width: 80px;
  cursor: pointer;

  &:hover {
    background-color: rgb(220, 220, 220);
  }
`

export const SagaMonitorBody = styled.section`
  position: absolute;
  top: 30px;
  bottom: 0;
  width: 100%;
`

export const FilterEffect = styled.input`
  width: 100px;
  margin: 4px 10px;

  &::placeholder {
    padding-left: 4px;
  }
`

export const FilterDropdown = styled.select`
  width: 60px;
`

export const FilterOption = styled.option`
  width: 30px;
`
