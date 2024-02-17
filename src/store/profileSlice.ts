import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProfileSlice {
    balance: string;
    account?: string;
    minStakeAmount?: string;
}

const initialState: ProfileSlice = {
    balance: "0",
    account: undefined,
    minStakeAmount: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<string>) => {
            state.balance = action.payload;
        },
        setAccount: (state, action: PayloadAction<string | undefined>) => {
            state.account = action.payload;
        },
        setMinStakeAmount: (state, action: PayloadAction<string>) => {
            state.minStakeAmount = action.payload;
        }
    },
});

export const { setBalance, setAccount, setMinStakeAmount } = profileSlice.actions;
export default profileSlice.reducer;