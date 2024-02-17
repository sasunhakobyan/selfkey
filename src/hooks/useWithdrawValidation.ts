import { RegisterOptions } from 'react-hook-form';
import { IFormInput } from '../types/FormInput';

export const useWithdrawValidation = (stakedNumber: string) => {
    const inputValidationOptions: RegisterOptions<IFormInput, "amount"> = {
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
        validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number',
    };

    return inputValidationOptions;
};