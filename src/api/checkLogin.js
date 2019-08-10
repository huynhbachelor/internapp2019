import url from './base_url';

const checkLogin = (token) => {
    const timeoutPromise =
        new Promise((resolve) => {
            setTimeout(resolve, 3000, null);
        });
    return Promise.race([
        timeoutPromise,
        fetch(url + 'check_login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ token })
            })
        ]);
};

export default checkLogin;

