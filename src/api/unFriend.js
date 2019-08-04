import url from './base_url';

const unFriend = async(token, userFriend) => (
    fetch(url + 'unfriend.php',
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

export default unFriend;
