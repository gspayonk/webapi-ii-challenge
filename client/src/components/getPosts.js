import axios from 'axios';

export default async id => {

    const result = await axios

    .get(`http://localhost:8000/api/users/${id}/posts`)
    
    .then(res => res);

    return result;
};