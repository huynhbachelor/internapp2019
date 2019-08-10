// import url from './base_url';

// const login = (username, password) => (
//     fetch(url + 'login.php',
//     {   
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(res => res.json())
// );

// export default login;
import url from './base_url';

const login = (username, password) => {
    const timeoutPromise =
        new Promise((resolve) => {
            setTimeout(resolve, 3000, null);
        });
    return Promise.race([
        timeoutPromise,
        fetch(url + 'login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
        ]);
};

export default login;

