const backendUrl = process.env.BACKEND_URL;

export const fetchClient = {
  get: async (url: string) => {
    return fetch(`${backendUrl}${url}`).then((res) => res.json());
  },
};
