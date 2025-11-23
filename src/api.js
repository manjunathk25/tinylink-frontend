import axios from 'axios';

const BASE_URL = 'https://tnylnk.up.railway.app';

export const createShortLink = ({url, customCode}) => axios.post(`${BASE_URL}/api/links`, { url, customCode });
export const getAllLinks = () => axios.get(`${BASE_URL}/api/links`);
export const getLinkStats = (code) => axios.get(`${BASE_URL}/api/links/${code}`);
export const deleteLinkByCode = (code) => axios.delete(`${BASE_URL}/api/links/${code}`);
export const redirectToOriginalUrl = (shortCode) => axios.post(`${BASE_URL}/${shortCode}`);