import url from './base_url';

const changeAdd = async(token, isadd) => (
    fetch(url + 'changeadd.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, isadd })
    })
    .then(res => res.text())
);

export default changeAdd;
