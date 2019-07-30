import url from './base_url';

const uploadImg = async (user, avatarSource) => {
    const urlTmp = url + 'image/';
    const uploadData = new FormData();
    uploadData.append('submit', 'ok');
    uploadData.append('imgName', user);
    uploadData.append('file', {
        type: 'image/jpg',
        uri: avatarSource,
        name: 'uploadimage.jpg'
    });
    fetch(urlTmp, {
        method: 'post',
        body: uploadData
    })
    .then(response => response.json())
    .then(response => {
        if (response.status) {
            return true;
        }
        return false;
    }).catch(() => {
        return false;
    });
};

export default uploadImg;

