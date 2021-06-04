import {API_URL, API_KEY} from '../constants';
import {nanoid} from 'nanoid';
export const uploadCats = (files) => {
    const formData = new FormData();

    files.forEach((file, index) => {
        formData.append('name', `file${index}`);
        formData.append('file', file);
        formData.append('sub_id', nanoid())
    })

    fetch(`${API_URL}images/upload`,{
        method: 'POST',
        headers: {
            'x-api-key': API_KEY
        },
        body: formData
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const listCats = () => {

    const params = {
        limit: 100,
    }
    return fetch(`${API_URL}images?${new URLSearchParams(params)}`,{
        headers: {
            'x-api-key': API_KEY
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const favouriteCat = (id, subId) => {

    const params = JSON.stringify({
        image_id: id,
        sub_id: subId
    });

    return fetch(`${API_URL}favourites`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY
        },
        body: params
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const unfavouriteCat = (id) => {
    return fetch(`${API_URL}favourites/${id}`,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY
        },
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const voteCat = (id, vote) => {
    const params = JSON.stringify({
        image_id: id,
        value: vote
    });
    
    return fetch(`${API_URL}votes`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY
        },
        body: params
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const getVotes = () => {
    return fetch(`${API_URL}votes`,{
        headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY,
        },
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}

export const getFavourites = (subId) => {
    const params = {
        sub_id: subId
    }
    return fetch(`${API_URL}favourites?${new URLSearchParams(params)}`,{
        headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    })
    .then(success => success)
    .catch(() => Promise.reject())
}