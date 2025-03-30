import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {Feature, FeatureCreate} from "../types/feature.ts";

export const featureApi = createApi({
    reducerPath: "featureApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/features",
    }),
    tagTypes: ["Features"],
    endpoints: (build) => ({
        getFeatures: build.query<Feature[], { organization_id: number, product_id: number }>({
            query: ({organization_id, product_id}) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}`,
            }),
            providesTags: (result, _error, {product_id}) =>
                result ? [{type: "Features", id: product_id}] : [],
        }),
        createFeature: build.mutation<Feature, FeatureCreate>({
            query: (input) => ({
                method: "POST",
                url: "",
                data: input,
            }),
            invalidatesTags: (_result, _error, { product_id }) => [
                { type: "Features", id: product_id },
            ],
        }),
    }),
});

export const {
    useGetFeaturesQuery: useGetFeatures,
    useCreateFeatureMutation: useCreateFeature
} = featureApi;
