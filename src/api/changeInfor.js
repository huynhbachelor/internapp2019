import url from './base_url';

const changeInfor = async(token, name, email) => (
    fetch(url + 'change_profile.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, email })
    })
    .then(res => res.text())
);

export default changeInfor;
