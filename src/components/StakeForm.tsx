import { ethers } from "ethers";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStakeValidation } from "../hooks/useStakeValidation";
import FormButton from "./layout/FormButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useStakeContract from "../hooks/useStakeContract";
import { useContractFunction } from "@usedapp/core";
import { useModal } from "../hooks/useModal";
import Modal from "./layout/Modal";
import { IFormInput } from "../types/FormInput";
import { toViewNumber } from "../toViewNumber";

const StakeForm = () => {
    const accountBalance = useSelector((state: RootState) => state.profile.balance)
    const balanceNumber = toViewNumber(accountBalance);
    const contract = useStakeContract();

    const { state: stakeStatus, send: stake } = useContractFunction(contract, 'stake', { transactionName: 'Stake' });

    const { register, handleSubmit, formState, setValue } = useForm<IFormInput>({
        mode: 'onBlur'
    });
    const inputValidationOptions = useStakeValidation(accountBalance);

    const setMaxAmount = useCallback(() => {
        setValue("amount", balanceNumber);
    }, [accountBalance])

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const bigNum = ethers.utils.parseEther(data.amount);
        stake({ value: bigNum });
    }

    const modal = useModal(stakeStatus.status);

    return (
        <>
            {modal && <Modal {...modal} />}
            <form
                className="flex flex-col items-center w-full mb-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-4xl my-8 w-full text-center text-white tracking-widest">Input your stake amount</h1>
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

                <FormButton title="Stake" />
            </form>
        </>
    )
}

export default StakeForm;