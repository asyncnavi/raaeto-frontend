import {
    Product,
} from "../types/product";
import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {Feature} from "../types/feature.ts";

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
        getProductFeatures: build.query<Feature[], { product_id: string }>({
            query: ({product_id}) => ({
                method: "GET",
                url: `/${product_id}/features`,
            })
        })
    }),
});

export const {
    useGetProductQuery: useGetProduct,
    useGetAllProductsQuery: useGetAllProducts,
    useGetProductFeaturesQuery : useGetProductFeatures
} = productApi;
