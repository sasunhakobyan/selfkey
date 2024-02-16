import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TabOptions } from "../types/TabOptions";
import { useDepositValidation } from "../hooks/useDepositValidation";
import { IFormInput } from "./Form";
import FormButton from "./FormButton";

interface DepositFormProps {
    accountBalance: string;
    minStakeAmount?: string;
    tab: TabOptions;
    sendStake: (...args: any[]) => any;
}

const DepositForm = (props: DepositFormProps) => {
    const { accountBalance, minStakeAmount, sendStake } = props;

    const { register, handleSubmit, formState } = useForm<IFormInput>({
        mode: 'onBlur'
    });
    const inputValidationOptions = useDepositValidation(accountBalance, minStakeAmount);
    const [stakeAmount, setStakeAmount] = useState("");

    const setMaxAmount = useCallback(() => {
        setStakeAmount(accountBalance);
    }, [accountBalance])

    const depositAmountInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setStakeAmount(e.target.value);
    }, [])

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const bigNum = ethers.utils.parseEther(data.amount);

        sendStake({ value: bigNum });
    }

    return (
        <form
            className="flex flex-col items-center w-full mb-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-4xl my-8 w-full text-center text-white tracking-widest">Input your deposit amount</h1>
            <div className="relative w-1/2 m-auto">
                <input
                    {...register('amount', inputValidationOptions)}
                    type="text"
                    id="amount"
                    className="w-full p-2.5 outline-none bg-gray-800 border border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-blue-500 pr-16 text-white"
                    placeholder="Enter amount"
                    value={stakeAmount}
                    onChange={depositAmountInputHandler}
                />
                <div
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                    onClick={setMaxAmount}
                >
                    Max
                </div>
            </div>
            {
                formState.errors.amount && (
                    <div className="flex justify-center text-red-500 text-sm">
                        {formState.errors.amount.message}
                    </div>
                )
            }

            <FormButton title="Deposit" />
        </form>
    )
}

export default DepositForm;