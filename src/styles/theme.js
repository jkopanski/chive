import {
  darkBlack,
  lightBlack,
  lightBlueA400,
  teal500,
  teal700,
  grey100,
  grey300,
  grey500,
  white } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: lightBlack,
    accent1Color: lightBlueA400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: teal500
  }
}
