import url from './base_url';

const submitfriend = async(token, userFriend) => {
    fetch(url + 'submitfriend.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, userFriend })
    })
    .then(res => res.text())
    .then(res => {
        if (res === 'THANH_CONG') {
            return true;
        }
        return false;
    })
    .catch(() => {
        return false;
    });
};

export default submitfriend;
