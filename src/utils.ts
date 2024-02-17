import { ethers } from "ethers";

export function formatNumber(number?: string) {
    return ethers.utils.formatEther(number || '0');
}