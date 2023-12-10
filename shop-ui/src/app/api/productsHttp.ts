import requests from "./httpClient";

export const productsHttp = {
  getProductsList: () => requests.get("products"),
  getProductDetails: (id: number) => requests.get(`products/${id}`),
};
