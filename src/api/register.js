import url from './base_url';

const register = (username, password) => (
    fetch(url + 'register.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
);

export default register;

