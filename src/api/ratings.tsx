import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CreateRating} from "@/types/rating.tsx";
import {RatingResponse} from "@/types/product.ts";

export const ratingApi = createApi({
    reducerPath: "ratingApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/ratings",
    }),
    tagTypes: ["Ratings"],
    endpoints: (build) => ({

        createRating: build.mutation<RatingResponse, CreateRating>({
            query: (newRating) => ({
                method: "POST",
                url: "",
                data: newRating,
            }),
            invalidatesTags: ["Ratings"],
        }),
    }),
});

export const {
    useCreateRatingMutation : useCreateRating
} = ratingApi;
