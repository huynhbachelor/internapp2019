import url from './base_url';

const submitFriend = async(token, userFriend) => (
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
);

export default submitFriend;
