import url from './base_url';

const changeStatus = async(token, status) => (
    fetch(url + 'changeStatus.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, status })
    })
    .then(res => res.text())
);

export default changeStatus;
