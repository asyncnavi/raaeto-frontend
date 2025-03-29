import {
    Product, ProductResponse, RatingResponse,
} from "@/types/product";
import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import { FeatureResponse} from "@/types/feature.ts";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/products",
    }),
    tagTypes: ["Products"],
    endpoints: (build) => ({

        getProduct: build.query<Product, { product_id: number , organization_id : number }>({
            query: ({ product_id, organization_id }) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}`,
            }),
        }),
        getAllProducts: build.query<ProductResponse[], void>({
            query: () => (
                {
                    method: "GET",
                    url: ""
                }
            )
        }),
        getProductFeatures: build.query<FeatureResponse[], { product_id: number , organization_id : number  }>({
            query: ({product_id, organization_id }) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}/features`,
            })
        }),
        getRatings : build.query<RatingResponse[], { product_id : number , organization_id : number ; feature_id : number }>({
            query : ({ product_id, organization_id , feature_id }) => ({
                method : "GET",
                url : `/${product_id}/${organization_id}/features/${feature_id}/ratings`
            })
        })

    }),
});

export const {
    useGetProductQuery: useGetProduct,
    useGetAllProductsQuery: useGetAllProducts,
    useGetProductFeaturesQuery : useGetProductFeatures,
    useGetRatingsQuery : useGetRatings
} = productApi;
