import url from './base_url';

const checkLogin = (token) => (
    fetch(url + 'check_login.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

export default checkLogin;
