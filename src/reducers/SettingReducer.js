const stateSetting = {
    mySetting: {
        isLocation: false,
        isUpdateLocation: true,
    }
};


const SettingReducer = (state = stateSetting, action) => {
    switch (action.type) {
        case 'LOADSETTING': {
            // let setting = {};
            // getSetting().then((res) => {
            //     setting = res;
            //     console.log(res);
            // });
            const setting = action.set;
            return { ...state, mySetting: setting };
        }
        case 'ISSETTINGCHANGE': {
            const obj = {};
            obj[action.field] = action.value; 
            Object.assign(state.mySetting, obj);
            return { ...state };
        }
        default: return state;
    }
};

export default SettingReducer;
