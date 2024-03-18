import requests from "./httpClient";

export const productsHttp = {
  getProductsList: (params: URLSearchParams) => {
    return requests.get("products", params)
  },
  getProductDetails: (id: number) => requests.get(`products/${id}`),
  getFilters: () => requests.get("products/filters"),
};
