import axios from 'axios';

export const getCategories = async () =>
  await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/categories`);

export const getCategory = async slug =>
  await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCategory = async (category, authtoken) =>
  await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/category`, category, {
    headers: {
      authtoken,
    },
  });
