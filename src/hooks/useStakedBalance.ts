import { useCall } from "@usedapp/core";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { getNumber } from "../utils/getNumber";

const useStakedBalance = (contract: Contract, accountAddress?: string) => {
    const [stakeBalance, setStakeBalance] = useState<number | undefined>(undefined);

    const { value, error } = useCall({
        contract,
        method: 'balanceOf',
        args: [accountAddress],
    }) ?? {};

    useEffect(() => {
        if (error) {
            console.error(error.message);
            return;
        }

        const amount = value?.[0];

        if (amount) {
            setStakeBalance(amount.toNumber());
        }
    }, [value, error])

    return stakeBalance && getNumber(stakeBalance);
}

export default useStakedBalance;