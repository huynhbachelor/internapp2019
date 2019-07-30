import url from './base_url';

const search = (re) => (
    fetch(url + 'search.php?SEARCH=' + re)
    .then(res => res.json())
);

export default search;
