import { ethers } from "ethers";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import FormButton from "./layout/FormButton";
import { useWithdrawValidation } from "../hooks/useWithdrawValidation";
import useStakeContract from "../hooks/useStakeContract";
import { useContractFunction } from "@usedapp/core";
import { useModal } from "../hooks/useModal";
import Modal from "./layout/Modal";
import { IFormInput } from "../types/FormInput";
import useStakedBalance from "../hooks/useStakedBalance";
import { toViewNumber } from "../toViewNumber";

const WithdrawForm = () => {
    const contract = useStakeContract();

    const stakedBalance = useStakedBalance();
    const stakedNumber = toViewNumber(stakedBalance?.value.toString());

    const { state: withdrawStatus, send: withdraw } = useContractFunction(contract, 'withdraw', { transactionName: 'Withdraw' });

    const { register, handleSubmit, formState, setValue } = useForm<IFormInput>({
        mode: 'onBlur'
    });
    const inputValidationOptions = useWithdrawValidation(stakedNumber);

    const setMaxAmount = useCallback(() => {
        setValue("amount", stakedNumber);
    }, [stakedNumber]);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const bigNum = ethers.utils.parseEther(data.amount);
        withdraw(bigNum);
    }

    const modal = useModal(withdrawStatus.status);

    return (
        <>
            {modal && <Modal {...modal} />}
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

                <FormButton title="Withdraw" />
            </form>
        </>
    );
}

export default WithdrawForm;