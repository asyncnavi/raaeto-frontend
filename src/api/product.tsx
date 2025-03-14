import {
    Product,
} from "../types/product";
import { axiosBaseQuery, BASE_URL } from "../client";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/products",
    }),
    tagTypes: ["Products"],
    endpoints: (build) => ({

        getProduct: build.query<Product, { id: string }>({
            query: (input) => ({
                method: "GET",
                url: `/${input.id}`,
            }),
        }),
        getAllProducts: build.query<Product[], void>({
            query: () => (
                {
                    method: "GET",
                    url: ""
                }
            )
        }),
    }),
});

export const {
    useGetProductQuery: useGetProduct,
    useGetAllProductsQuery : useGetAllProducts
} = productApi;
