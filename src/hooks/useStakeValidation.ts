import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { ethers } from 'ethers';
import { useCallback } from 'react';

export const useStakeValidation = (accountBalance: string) => {
    const minStakeAmount = useSelector((state: RootState) => state.profile.minStakeAmount);

    const minStakeNumber = ethers.utils.formatEther(minStakeAmount || '0');
    const accountBalanceNumber = ethers.utils.formatEther(accountBalance || '0');

    const inputValidationOptions = useCallback(() => ({
        required: {
            value: true,
            message: 'Please enter an amount',
        },
        min: {
            value: minStakeNumber,
            message: `Amount must be greater than ${minStakeNumber}`,
        },
        max: {
            value: accountBalanceNumber,
            message: `Amount must be less than or equal to ${accountBalanceNumber}`,
        },
        validate: (value: string) => !isNaN(Number(value)) || 'Please enter a valid number',
    }), [accountBalance]);

    return inputValidationOptions;
};