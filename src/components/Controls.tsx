import styled from "styled-components"

export const BasicButton = styled.button`
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  background: linear-gradient(to bottom, #33bdef 5%, #019ad2 100%);
  background-color: #33bdef;
  border-radius: 6px;
  border: 1px solid #057fd0;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #5b6178;
  &:hover {
    background: linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
    background-color: #019ad2;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`
BasicButton.displayName = "BasicButton"

export const CancelButton = styled.button`
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  background: linear-gradient(to bottom, #d9534f 5%, #d43f3a 100%);
  background-color: #d9534f;
  border-radius: 6px;
  border: 1px solid #d43f3a;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #5b6178;
  &:hover {
    background: linear-gradient(to bottom, #d43f3a 5%, #b43f3a 100%);
    background-color: #b43f3a;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`
CancelButton.displayName = "CancelButton"

export const IconButton = styled.button`
  border-radius: 50%;
  width: 2em;
  height: 2em;
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  background: linear-gradient(to bottom, #fff 5%, #ccc 100%);
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  align-content: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 0px -1px 0px #5b6178;
  &:hover {
    background: linear-gradient(to bottom, #ccc 5%, #bbb 100%);
    background-color: #ccc;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`
IconButton.displayName = "IconButton"
