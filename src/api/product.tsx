import {
    Product, ProductResponse, RatingResponse,
} from "@/types/product";
import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {FeatureResponse} from "@/types/feature.ts";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/products",
    }),
    tagTypes: ["Products", "Ratings", "Features"],
    endpoints: (build) => ({

        getProduct: build.query<Product, { product_id: number, organization_id: number }>({
            query: ({product_id, organization_id}) => ({
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
        getProductFeatures: build.query<FeatureResponse[], { product_id: number, organization_id: number }>({
            query: ({product_id, organization_id}) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}/features`,
            }),
            providesTags: (result, _error, { product_id }) =>
                result ? [{ type: "Features", id: product_id }] : [{ type: "Features", id: product_id }],

        }),
        getRatings: build.query<RatingResponse[], { product_id: number, organization_id: number; feature_id: number }>({
            query: ({product_id, organization_id, feature_id}) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}/features/${feature_id}/ratings`
            }),
        }),
        searchProducts: build.query<ProductResponse[], { q: string }>({
            query: ({q}) => ({
                method: "GET",
                url: `/search?q=${q}`
            })
        })
    }),
});

export const {
    useGetProductQuery: useGetProduct,
    useGetAllProductsQuery: useGetAllProducts,
    useGetProductFeaturesQuery: useGetProductFeatures,
    useGetRatingsQuery: useGetRatings,
    useSearchProductsQuery: useSearchProducts
} = productApi;
