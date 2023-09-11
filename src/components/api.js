import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const KEY = '38369214-2131a54870ec208cdae419196';

export const dataQuery = async (query, page = 1) => {
  const params = {
    q: query,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: page,
  };
  const responce = await axios.get(`/`, { params });
  return responce.data;
};
