import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authClient, BASE_URL} from "../../client";
import {OrganizationResponse} from "@/types/organization.ts";

type OrganizationState = {
    id: number | null;
    name: string | null;
    description: string | null;
    user_id: number | null;
    logo_url?: string | null;
    created_at: string | null;
    updated_at: string | null;
    status: "idle" | "loading" | "failed" | "success";
    error: string | null;
};

const initialState: OrganizationState = {
    id: null,
    name: null,
    description: null,
    user_id: null,
    logo_url: null,
    created_at: null,
    updated_at: null,
    status: "idle",
    error: null,
};

export const fetchOrganization = createAsyncThunk(
    "organization/fetch",
    async (_, {fulfillWithValue, rejectWithValue}) => {
        try {
            const response = await authClient.get<OrganizationResponse>(BASE_URL + "/org/me");
            return fulfillWithValue(response.data);
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch organization"); // ✅ Proper error handling
        }
    }
);

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganization.pending, (state) => {
                state.status = "loading";
                state.id = null;
                state.name = null;
                state.error = null;
            })
            .addCase(fetchOrganization.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(fetchOrganization.fulfilled, (state, action: PayloadAction<OrganizationResponse, string>) => {
                state.status = "success";
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.description = action.payload.description ?? null;
                state.user_id = action.payload.user_id;
                state.logo_url = action.payload.logo_url;
                state.created_at = action.payload.created_at;
                state.updated_at = action.payload.updated_at;
                state.error = null;
            });
    },
});

export default organizationSlice.reducer;
