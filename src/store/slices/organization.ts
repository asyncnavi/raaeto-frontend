import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authClient, BASE_URL} from "../../client";
import {Organization} from "../../api/organization.tsx";


// TODO : Properly parse error in fetch Organization Slice

type OrganizationState = {
    id: string | null;
    name: string | null;
    status: 'idle' | 'loading' | 'failed' | 'success';
};

const initialState: OrganizationState = {
    id: null,
    name: null,
    status: "idle"
};

export const fetchOrganization = createAsyncThunk(
    'organization/fetch',
    async (_, thunkAPI) => {
        try {
            const organization = await authClient.get<Organization>(BASE_URL + "/organization/me");
            return thunkAPI.fulfillWithValue(organization);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return thunkAPI.rejectWithValue(e.code);
        }
    }
);

const organizationSlice = createSlice({
    name: 'organizationStore',
    reducerPath : 'organizationSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOrganization.pending, (state) => {
                state.status = "loading";
                state.id = null;
                state.name = null;
            })
            .addCase(fetchOrganization.rejected, (state) => {
                state.status = "failed";
                state.id = null;
                state.name = null;

            })
            .addCase(fetchOrganization.fulfilled, (state, action: PayloadAction<Organization>) => {
                state.status = "success";
                state.id = action.payload.id;
                state.name = action.payload.name;
            });
    }
});

export default organizationSlice;

