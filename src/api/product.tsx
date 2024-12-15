import { CreateProduct, CreateProductResponse } from "../types/product";
import { axiosBaseQuery, BASE_URL } from "../client";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL + "/product",
  }),
  endpoints: (build) => ({
    createProduct: build.mutation<CreateProductResponse, CreateProduct>({
      query: (input) => ({
        method: "POST",
        url: "",
        data: input,
      }),
    }),
  }),
});

export const { useCreateProductMutation: useCreateProduct } = productApi;
