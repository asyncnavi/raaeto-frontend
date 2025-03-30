import {CreateProduct, CreateProductResponse, Product} from "../types/product";
import {axiosBaseQuery, BASE_URL} from "../client";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CreateOrganization, Organization} from "@/types/organization.ts";


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
        getProducts: build.query<Product[], { organization_id: number }>({
            query: () => ({
                method: "GET",
                url: `/products`,
            }),
            providesTags: (result, error, arg) =>
                result ? [{type: "Products", id: arg.organization_id, error: error}] : [],
        }),
        createOrganization: build.mutation<Organization,CreateOrganization>({
            query: (input) => ({
                method: "POST",
                url: "",
                data: input,
            }),
        }),
        createProduct: build.mutation< CreateProductResponse,CreateProduct>({
            query: (input) => ({
                method: "POST",
                url: "/products",
                data: input,
            }),
            invalidatesTags: (_result, _error, input) => [
                {type: "Products", id: input.name},
            ],
        }),
        deleteProduct: build.mutation<{ message: string }, { product_id: number }>({
            query: ({product_id}) => ({
                method: "DELETE",
                url: `/products/${product_id}`,

            }),
            invalidatesTags: (_result, _error, {product_id}) => [
                {type: "Products", id: product_id},
            ],
        }),

    }),
});

export const {
    useGetProductsQuery: useGetProducts,
    useGetUserOrganizationQuery: useGetUserOrganization,
    useCreateOrganizationMutation: useCreateOrganization,
    useCreateProductMutation: useCreateProduct,
    useDeleteProductMutation: useDeleteProduct,

} = organizationApi;
