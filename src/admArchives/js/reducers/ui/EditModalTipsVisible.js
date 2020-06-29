import UpUIState from '../../actions/UpUIState';
const EditModalTipsVisible = (state = {
    UserIDTipsVisible:false,
    UserNameTipsVisible: false,
    GradeTipsVisible: false,
    TitleTipsVisible: false,
    ClassTipsVisible: false,
    TelephoneTipsVisible: false,
    EmailTipsVisible: false,
    IDCardNoTipsVisible: false,
    HomeAdressTipsVisible: false,
    GenderTipsVisible: false,
    changeSubjectTipsVisible: false,
    TitleIDVisible: false,
    PositionTipsVisible: false,
    GraduateJobTypeVisible: false
}, actions) => {
    switch (actions.type) {
        case UpUIState.EDIT_MODAL_TIPS_VISIBLE:
            return Object.assign({}, state, { ...actions.data });
        case UpUIState.EDIT_ALL_MODAL_TIPS_VISIBLE:
            return Object.assign({}, state, {
                UserIDTipsVisible:false,
                UserNameTipsVisible: false,
                GradeTipsVisible: false,
                TitleTipsVisible: false,
                ClassTipsVisible: false,
                TelephoneTipsVisible: false,
                EmailTipsVisible: false,
                IDCardNoTipsVisible: false,
                HomeAdressTipsVisible: false,
                GenderTipsVisible: false,
                changeSubjectTipsVisible: false,
                TitleIDVisible: false,
                PositionTipsVisible: false,
                GraduateJobTypeVisible: false
            });
        default:
            return state;
    }
};
export default EditModalTipsVisible;
