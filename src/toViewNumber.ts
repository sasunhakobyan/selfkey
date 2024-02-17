import { ethers } from "ethers";

export function toViewNumber(number?: string) {
    return ethers.utils.formatEther(number || '0');
}