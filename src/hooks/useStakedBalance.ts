import { useCall } from "@usedapp/core";
import useStakeContract from "./useStakeContract";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useStakedBalance = () => {
    const contract = useStakeContract();
    const account = useSelector((state: RootState) => state.profile.account);

    return useCall({
        contract,
        method: 'balanceOf',
        args: [account],
    });
}

export default useStakedBalance;