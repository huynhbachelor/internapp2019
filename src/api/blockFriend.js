import url from './base_url';

const blockFriend = async(token, userFriend) => (
    fetch(url + 'blockfriend.php',
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

export default blockFriend;
