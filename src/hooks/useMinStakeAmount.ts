import { useCall } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { utils } from 'ethers';
import PolygonABI from '../abis/Polygon.json';

const useMinStakeAmount = () => {
    const contract = useStackContract();
    return useCall({
        contract,
        method: 'minStakeAmount',
        args: [],
    });
};

export const useStackContract = (): Contract => {
    const contractAddress = proccess.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = useMemo(() => {
        const abiInterface = new utils.Interface(PolygonABI);
        const contractAddress = "0xdD08C4f14475D419ebe6C9f31865bf3730f7EF92";
        return new Contract(contractAddress, abiInterface);
    }, [contractAddress]);
    return contract
}

export default useMinStakeAmount;