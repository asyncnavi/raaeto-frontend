import { Product } from "../types/product";
import { axiosBaseQuery, BASE_URL } from "../client";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface Organization {
  name: string;
  organization_id: string | null;
}

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL + "/organization",
  }),
  endpoints: (build) => ({
    getUserOrganization: build.query<Organization, void>({
      query: () => ({
        method: "GET",
        url: "/me",
      }),
    }),

    getProducts: build.query<Product[], { organization_id: string }>({
      query: ({ organization_id }) => ({
        method: "GET",
        url: `/products/${organization_id}`,
      }),
    }),

    createOrganization: build.mutation<void, { name: string }>({
      query: (input) => ({
        method: "POST",
        url: "",
        data: input,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery: useGetProducts,
  useGetUserOrganizationQuery: useGetUserOrganization,
  useCreateOrganizationMutation: userCreateOrganization,
} = organizationApi;
