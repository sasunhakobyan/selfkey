import { useEffect, useState } from "react";
import { StakeStatus } from "../types/StakeStatus";

import pendingImage from '../assets/pending.png';
import miningImage from '../assets/mining.png';
import successImage from '../assets/success.png';

interface ModalState {
    image: string;
    message: string;
    close?: () => void;
}

export const useModalData = (status: string) => {
    const [modal, setModal] = useState<ModalState | undefined>(undefined);

    useEffect(() => {
        switch (status) {
            case StakeStatus.PendingSignature:
                setModal({
                    image: pendingImage,
                    message: 'Awaiting signature. Please check your wallet to approve the transaction'
                })

                break;
            case StakeStatus.Mining:
                setModal({
                    image: miningImage,
                    message: 'Transaction mining in progress. Please wait for confirmation'
                });

                break;
            case StakeStatus.Success:
                setModal({
                    image: successImage,
                    message: 'Congratulations! Your stake has been successfully processed',
                    close: () => setModal(undefined)
                });

                break;
            default:
                setModal(undefined);
                break;
        }
    }, [status])

    return modal;
}