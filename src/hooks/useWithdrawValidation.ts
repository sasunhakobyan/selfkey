import { useCallback } from 'react';

export const useWithdrawValidation = (stakedNumber: string) => {
    const inputValidationOptions = useCallback(() => ({
        required: {
            value: true,
            message: 'Please enter an amount',
        },
        min: {
            value: 0,
            message: `Amount must be greater than 0`,
        },
        max: {
            value: stakedNumber,
            message: `Amount must be less than or equal to ${stakedNumber}`,
        },
        validate: (value: string) => !isNaN(Number(value)) || 'Please enter a valid number',
    }), [stakedNumber])

    return inputValidationOptions;
};