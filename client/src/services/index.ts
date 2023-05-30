const BASE_URL = "http://localhost:8080/";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const api = (url: string, method: Method = "GET", body?: any) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};
