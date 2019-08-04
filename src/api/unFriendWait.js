import url from './base_url';

const unFriendWait = async(token, userFriend) => (
    fetch(url + 'unfriendwait.php',
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

export default unFriendWait;
