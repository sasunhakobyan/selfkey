import { utils } from "ethers";
import { BigNumber } from "ethers";

export const getNumber = (hexNum: BigNumber | number): string => {
    const bigNumber = BigNumber.from(hexNum);
    const number = utils.formatEther(bigNumber);

    return number;
}