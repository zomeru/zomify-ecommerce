import axios from 'axios';

export const createOrUpdateUser = async authtoken => {
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
