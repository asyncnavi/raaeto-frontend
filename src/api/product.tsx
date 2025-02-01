import {
    CreateProduct,
    CreateProductResponse,
    Product,
} from "../types/product";
import { axiosBaseQuery, BASE_URL } from "../client";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/product",
    }),
    tagTypes: ["Products"],
    endpoints: (build) => ({
        createProduct: build.mutation<CreateProductResponse, CreateProduct>({
            query: (input) => ({
                method: "POST",
                url: "",
                data: input,
            }),
        }),
        getProduct: build.query<Product, { id: string }>({
            query: (input) => ({
                method: "GET",
                url: `/${input.id}`,
            }),
        }),
    }),
});

export const {
    useCreateProductMutation: useCreateProduct,
    useGetProductQuery: useGetProduct,
} = productApi;
