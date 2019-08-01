// Action
const isLoadSetting = (set) => {
    return {
        type: 'LOADSETTING',
        set
    };
};

export const isSettingChange = (field, value) => {
    return {
        type: 'ISSETTINGCHANGE',
        field,
        value
    };
};


export default isLoadSetting;
