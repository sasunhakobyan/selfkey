import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProfileSlice {
    balance: string;
}

const initialState: ProfileSlice = {
    balance: "0.0",
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<string>) => {
            state.balance = action.payload;
        },
    },
});

export const { setBalance } = profileSlice.actions;
export default profileSlice.reducer;