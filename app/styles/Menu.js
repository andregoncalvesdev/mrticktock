import { Dimensions } from 'react-native'
import StyleVars from 'mrticktock/app/styles/StyleVars'

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

export default {
  container: {
    width: windowWidth,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 20
  },

  menuItem: {
    color: StyleVars.Colors.white,
    paddingBottom: 15,
    paddingTop: 15,
    fontFamily: 'Helvetica-Bold'
  },

  backgroundWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight
  },

  backgroundLogo: {
    width: null,
    height: null,
    flex: 1,
    opacity: .1
  }
}
