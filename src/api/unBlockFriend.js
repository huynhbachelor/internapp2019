import url from './base_url';

const unBlockFriend = async(token, userFriend) => (
    fetch(url + 'unblockfriend.php',
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

export default unBlockFriend;
