// Action
const isLoadSetting = (set) => {
    return {
        type: 'LOADSETTING',
        set,
    };
};

export const isSettingChange = (field, value) => {
    return {
        type: 'ISSETTINGCHANGE',
        field,
        value
    };
};

export const isAddFriendChange = (field, value) => {
    return {
        type: 'ISADDFRIEND',
        field,
        value
    };
};


export default isLoadSetting;
