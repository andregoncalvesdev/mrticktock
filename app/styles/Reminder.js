import { Dimensions } from 'react-native'
import StyleVars from 'mrticktock/app/styles/StyleVars'

const windowWidth = Dimensions.get("window").width

export default {
  titleContainer: {
		borderBottomWidth: 2,
		borderBottomColor: StyleVars.Colors.white,
		marginRight: 80,
		marginLeft: 30,
		marginTop: 25,
		marginBottom: 5
	},

	title: {
		color: StyleVars.Colors.white,
		fontFamily: 'Helvetica-Bold',
		paddingLeft: 30,
		paddingBottom: 8,
		fontSize: 22
	},

  switchContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 60,
    marginTop: 40
  },

  activeText: {
    color: StyleVars.Colors.white,
    fontSize: 16
  },

  pickerTitle: {
    color: StyleVars.Colors.white,
    textAlign: 'center',
		marginBottom: 20
  },

  itemStyle: {
    fontSize: 25,
    color: StyleVars.Colors.white,
    textAlign: 'center'
  },

  wrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 135
  },

  column: {
    flex: .5
  },

  setTimeButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  setTimeButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: StyleVars.Colors.blue,
    borderRadius: 0,
    borderColor: StyleVars.Colors.blue
  }
}
