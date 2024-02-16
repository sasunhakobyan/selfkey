import { RegisterOptions } from 'react-hook-form';
import { IFormInput } from '../components/Form';

export const useDepositValidation = (accountBalance: string, minStakeAmount?: string) => {
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
            value: parseFloat(accountBalance),
            message: `Amount must be less than or equal to ${accountBalance}`,
        },
        validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number',
    };

    return inputValidationOptions;
};
