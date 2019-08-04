import url from './base_url';

const addFriend = (token, userName) => (
    fetch(url + 'addfriend.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, userName })
    })
    .then(res => res.text())
);

export default addFriend;
