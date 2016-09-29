import { Dimensions } from 'react-native'
import StyleVars from 'mrticktock/app/styles/StyleVars'

const windowWidth = Dimensions.get("window").width

export default {
	taskNameContainer: {
		marginTop: 60
	},

	taskName: {
    color: StyleVars.Colors.white,
    textAlign: 'center',
		fontSize: 22,
		marginBottom: 10,
		fontFamily: 'Helvetica-Bold'
  },

	taskTotalTime: {
    color: StyleVars.Colors.white,
    textAlign: 'center',
		fontSize: 12,
		fontFamily: 'Helvetica-Light'
  },

	title: {
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
    marginTop: 50,
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
  },

	backButtonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 10,
		left: 10,
		paddingRight: 40,
		paddingBottom: 10
	},

	backIcon: {
		color: StyleVars.Colors.white,
		paddingRight: 5
	}
}
