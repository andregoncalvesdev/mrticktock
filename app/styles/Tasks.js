import StyleVars from 'mrticktock/app/styles/StyleVars'

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

	rowBack: {
		alignItems: 'center',
		backgroundColor: StyleVars.Colors.darkerBlue,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: 15,
	},

  backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},

  backRightBtnRight: {
		backgroundColor: StyleVars.Colors.darkBlue,
		right: 0
	},

  backTextWhite: {
		color: '#FFF'
	},

	backRightBtnLeft: {
		backgroundColor: StyleVars.Colors.blue,
		right: 75
	}
}
