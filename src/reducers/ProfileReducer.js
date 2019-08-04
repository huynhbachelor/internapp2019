const stateSetting = {
    profile: {
        token: '',
        Username: '',
        Email: '',
        subtitle: '',
        Avatar_url: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/21370917_662301493968461_2919848258433440688_n.jpg?_nc_cat=103&_nc_oc=AQlC2X_AjlNePuq0S74sSWaoi88SkE1E8Pp8lOynWJg_Vt4i1YxE9GN-ECo0r-pbZQ0&_nc_ht=scontent.fsgn4-1.fna&oh=ae7b8a2cdea256c35a7fad54c9a300ef&oe=5DE7D727',
    }
};


const ProfileReducer = (state = stateSetting, action) => {
    switch (action.type) {
        case 'ISCHANGE': {
            return { ...state, profile: action.profile };
        }
        case 'IMGCHANG': {
            return { ...state, profile: { ...state.profile, Avatar_url: action.img } };
        }
        default: return state;
    }
};

export default ProfileReducer;
