import { Contract, utils } from "ethers";
import { useMemo } from "react";

import PolygonABI from '../abis/Polygon.json';

const useStakeContract = (): Contract => {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

    const contract = useMemo(() => {
        const abiInterface = new utils.Interface(PolygonABI);
        return new Contract(contractAddress, abiInterface);
    }, [contractAddress]);

    return contract
}

export default useStakeContract;