import { RegisterOptions } from 'react-hook-form';

interface IFormInput {
    amount: string;
}

export const useWithdrawValidation = (stakeBalance: string, minStakeAmount?: string) => {
    const inputValidationOptions: RegisterOptions<IFormInput, "amount"> = {
        required: {
            value: true,
            message: 'Please enter an amount',
        },
        min: {
            value: parseFloat(minStakeAmount ?? "0"),
            message: `Amount must be greater than ${minStakeAmount}`,
        },
        max: {
            value: parseFloat(stakeBalance),
            message: `Amount must be less than or equal to ${stakeBalance}`,
        },
        validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number',
    };

    return inputValidationOptions;
};
