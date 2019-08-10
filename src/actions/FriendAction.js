const friendChange = (user, st, sub, ava) => {
    return {
        type: 'ISFRIENDCHANGE',
        user,
        st,
        sub,
        ava
    };
};


export default friendChange;
