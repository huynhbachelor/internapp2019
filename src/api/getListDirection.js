const getListDirection = (place1, place2) => (
    fetch('http://www.yournavigation.org/api/1.0/gosmore.php?flat='
    + place1.latitude + '&flon='
    + place1.longitude + '&tlat='
    + place2.latitude + '&tlon='
    + place2.longitude + '&format=geojson',
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => res.coordinates)
);

export default getListDirection;
