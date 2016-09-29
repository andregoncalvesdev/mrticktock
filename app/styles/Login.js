import { Dimensions } from 'react-native'
import StyleVars from 'mrticktock/app/styles/StyleVars'

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

export default {
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  logo: {
    marginBottom: 50,
    width: 102,
    height: 119,
    resizeMode: 'stretch'
  },

  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: StyleVars.Colors.white,
    borderBottomWidth: 2
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: StyleVars.Colors.lightBlue,
    color: "white",
    fontSize: 16,
    padding: 5
  },

  loginButtonContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: StyleVars.Colors.blue,
    borderRadius: 0,
    borderColor: StyleVars.Colors.blue,
    marginTop: 30
  }
}
