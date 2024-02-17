import { useCall } from '@usedapp/core';
import useStakeContract from './useStakeContract';

const useMinStakeAmount = () => {
    const contract = useStakeContract();
    return useCall({
        contract,
        method: 'minStakeAmount',
        args: [],
    });
};

export default useMinStakeAmount;