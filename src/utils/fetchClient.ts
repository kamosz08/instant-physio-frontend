const backendUrl = process.env.BACKEND_URL;

//TODO: remove console logs

export const fetchClient = {
  get: async (url: string, headers?: HeadersInit) => {
    console.log("get: ", backendUrl, url);

    return fetch(`${backendUrl}${url}`, { headers: headers }).then((res) =>
      res.json(),
    );
  },
  post: async (url: string, body: Object, headers?: HeadersInit) => {
    console.log("post: ", url);

    return fetch(`${backendUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }).then((res) => res.json());
  },
};
