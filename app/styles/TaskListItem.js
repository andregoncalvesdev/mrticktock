import StyleVars from 'mrticktock/app/styles/StyleVars'

export default {
  taskRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: StyleVars.Colors.darkerBlue
  },

  toggleButton: {
    color: StyleVars.Colors.white,
    fontSize: 30,
    marginRight: 20,
    width: 35
  },

  taskInfoText: {
    color: StyleVars.Colors.white
  },

  taskInfo: {
    flex: 1
  },

  taskInfoProject: {
    fontFamily: 'Helvetica-Light',
    fontSize: 12,
    color: StyleVars.Colors.white
  }
}
