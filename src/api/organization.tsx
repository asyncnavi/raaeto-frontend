import {CreateProduct, CreateProductResponse, Product} from "../types/product";
import {axiosBaseQuery, BASE_URL} from "../client";
import { createApi} from "@reduxjs/toolkit/query/react";

export interface Organization {
    name: string;
    id: string | null;
}

export const organizationApi = createApi({
    reducerPath: "organizationApi",
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + "/org",
    }),
    tagTypes: ["Products"],
    endpoints: (build) => ({
        getUserOrganization: build.query<Organization, void>({
            query: () => ({
                method: "GET",
                url: "/me",
            }),
        }),
        getProducts: build.query<Product[], { org_id : string }>({
            query: ({org_id} ) => ({
                method: "GET",
                url: `/${org_id}/products`,
            }),
            providesTags: (result, error, arg) =>
                result ? [{ type: "Products", id: arg.org_id , error : error}] : [],
        }),
        createOrganization: build.mutation<void, { name: string }>({
            query: (input) => ({
                method: "POST",
                url: "",
                data: input,
            }),
        }),
        createProduct: build.mutation<CreateProductResponse, CreateProduct>({
            query: (input) => ({
                method: "POST",
                url: "/products",
                data: input,
            }),
            invalidatesTags: (_result, _error, { organization_id }) => [
                { type: "Products", id: organization_id },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery: useGetProducts,
    useGetUserOrganizationQuery: useGetUserOrganization,
    useCreateOrganizationMutation: useCreateOrganization,
    useCreateProductMutation: useCreateProduct,

} = organizationApi;
