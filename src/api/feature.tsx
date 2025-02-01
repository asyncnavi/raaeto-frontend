import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {Feature, FeatureCreate} from "../types/feature.ts";

export const featureApi = createApi({
    reducerPath: "featureApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/feature",
    }),
    tagTypes: ["Features"],
    endpoints: (build) => ({
        createFeature: build.mutation<Feature, FeatureCreate>({
            query: (input) => ({
                method: "POST",
                url: "",
                data: input,
            }),
        }),
        getFeatures: build.query<Feature[], { organization_id: string, product_id: string }>({
            query: ({organization_id, product_id}) => ({
                method: "GET",
                url: `/${product_id}/${organization_id}`,
            }),
        }),
    }),
});

export const {
    useCreateFeatureMutation: useCreateFeature,
    useGetFeaturesQuery: useGetFeatures
} = featureApi;
