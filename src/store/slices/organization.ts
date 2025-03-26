import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authClient, BASE_URL } from "../../client";
import { Organization } from "../../api/organization.tsx";

type OrganizationState = {
    id: string | null;
    name: string | null;
    status: "idle" | "loading" | "failed" | "success";
    error: string | null;
};

const initialState: OrganizationState = {
    id: null,
    name: null,
    status: "idle",
    error: null,
};

export const fetchOrganization = createAsyncThunk(
    "organization/fetch",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await authClient.get<Organization>(BASE_URL + "/org/me");
            return fulfillWithValue(response);
        } catch (error: any) {
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
            .addCase(fetchOrganization.fulfilled, (state, action: PayloadAction<Organization>) => {
                state.status = "success";
                console.log(action)
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.error = null;
            });
    },
});

export default organizationSlice.reducer;
