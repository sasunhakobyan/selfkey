import { Contract, ethers, utils } from "ethers";
import { TabOptions } from "../types/TabOptions";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "./Form";
import { useCallback, useState } from "react";
import FormButton from "./FormButton";
import { useWithdrawValidation } from "../hooks/useWithdrawValidation";

interface WithdrawFormProps {
    stakeBalance: string;
    minStakeAmount?: string;
    tab: TabOptions;
    contract: Contract;
    withdraw: (...args: any[]) => any;
}

const WithdrawForm = (props: WithdrawFormProps) => {
    const { stakeBalance, minStakeAmount, withdraw } = props;

    const { register, handleSubmit, formState } = useForm<IFormInput>({
        mode: 'onBlur'
    });
    const inputValidationOptions = useWithdrawValidation(stakeBalance, minStakeAmount);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const stakeAmountInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWithdrawAmount(e.target.value);
    }, [])

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const bigNum = ethers.utils.parseEther(data.amount);

        withdraw(bigNum);
    }

    return (
        <form
            className="flex flex-col items-center w-full mb-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-4xl my-8 w-full text-center text-white tracking-widest">Input your withdraw amount</h1>
            <div className="relative w-1/2 m-auto">
                <input
                    {...register('amount', inputValidationOptions)}
                    type="text"
                    id="amount"
                    className="w-full p-2.5 outline-none bg-gray-800 border border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-blue-500 pr-16 text-white"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={stakeAmountInputHandler}
                />
            </div>
            {
                formState.errors.amount && (
                    <div className="flex justify-center text-red-500 text-sm">
                        {formState.errors.amount.message}
                    </div>
                )
            }

            <FormButton title="Withdraw" />
        </form>
    );
}

export default WithdrawForm;