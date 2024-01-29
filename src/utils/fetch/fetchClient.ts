const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

class FetchClient {
  private clientHeaders: HeadersInit;

  constructor() {
    this.clientHeaders = {};
  }

  private getDefaultHeaders() {
    if (typeof window !== "undefined") return this.clientHeaders;
    return {};
  }

  public setDefaultClientHeaders(headers: HeadersInit) {
    this.clientHeaders = {
      ...this.clientHeaders,
      ...headers,
    };
  }

  public async get(url: string, headers?: HeadersInit) {
    console.log("get: ", backendUrl, url);

    return fetch(`${backendUrl}${url}`, {
      headers: { ...this.getDefaultHeaders(), ...headers },
    }).then(async (res) => {
      return { body: await res.json(), headers: res.headers };
    });
  }

  public async post(url: string, body: Object, headers?: HeadersInit) {
    console.log("post: ", url);

    return fetch(`${backendUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...this.getDefaultHeaders(),
        ...headers,
      },
    }).then(async (res) => {
      if (res?.status >= 400) {
        return res.json().then((errorResponse) => {
          throw new Error(errorResponse?.message || "Something went wrong");
        });
      }

      if (res?.status !== 201)
        return { body: await res.json(), headers: res.headers };

      return { body: null, headers: res.headers };
    });
  }
}

export const fetchClient = new FetchClient();
