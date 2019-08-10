const stateSetting = {
    mySetting: {
        isLocation: true,
        isUpdateLocation: true,
        isAddFriend: true,
    }
};


const SettingReducer = (state = stateSetting, action) => {
    const set = state.mySetting;
    switch (action.type) {
        case 'LOADSETTING': {
            if (action.set !== {}) {
                Object.assign(set, action.set);
            }
            return { ...state, mySetting: set };
        }
        case 'ISSETTINGCHANGE': {
            if (action.field === 'isLocation' && action.value === false) {
                const obj = {
                    isUpdateLocation: false,
                };
                obj[action.field] = action.value;
                console.log(obj);
                return { ...state, mySetting: Object.assign({}, set, obj) };
            } 
            const obj = {};
            obj[action.field] = action.value;
            return { ...state, mySetting: Object.assign({}, set, obj) };
        }
        default: return state;
    }
};

export default SettingReducer;
