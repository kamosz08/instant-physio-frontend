const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

class FetchClient {
  private clientHeaders: HeadersInit;
  private serverHeaders: HeadersInit;

  constructor() {
    this.clientHeaders = {};
    this.serverHeaders = {};
  }

  private getDefaultHeaders() {
    if (typeof window !== "undefined") return this.clientHeaders;
    return this.serverHeaders;
  }

  public setDefaultClientHeaders(headers: HeadersInit) {
    this.clientHeaders = {
      ...this.clientHeaders,
      ...headers,
    };
  }

  public setDefaultServerHeaders(headers: HeadersInit) {
    this.serverHeaders = {
      ...this.serverHeaders,
      ...headers,
    };
  }

  public async get(url: string, requestInit?: RequestInit) {
    console.log("get: ", backendUrl, url);

    return fetch(`${backendUrl}${url}`, {
      ...requestInit,
      headers: { ...this.getDefaultHeaders(), ...requestInit?.headers },
    }).then(async (res) => {
      return { body: await res.json(), headers: res.headers };
    });
  }

  public async post(url: string, body: Object, requestInit?: RequestInit) {
    console.log("post: ", url);

    return fetch(`${backendUrl}${url}`, {
      ...requestInit,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...this.getDefaultHeaders(),
        ...requestInit?.headers,
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

  public async patch(url: string, body: Object, requestInit?: RequestInit) {
    console.log("patch: ", url);

    return fetch(`${backendUrl}${url}`, {
      ...requestInit,
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...this.getDefaultHeaders(),
        ...requestInit?.headers,
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
