import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createShortLink = ({url, customCode}) => axios.post(`${BASE_URL}/api/links`, { url, customCode });
export const getAllLinks = () => axios.get(`${BASE_URL}/api/links`);
export const getLinkStats = (code) => axios.get(`${BASE_URL}/api/links/${code}`);
export const deleteLinkByCode = (code) => axios.delete(`${BASE_URL}/api/links/${code}`);
export const redirectToOriginalUrl = (shortCode) => axios.post(`${BASE_URL}/${shortCode}`);