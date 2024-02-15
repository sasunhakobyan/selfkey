import { useEtherBalance, useEthers } from "@usedapp/core";
import NavBar from "../components/NavBar";
import StakeForm from "../components/StakeForm";
import Container from "../components/Container";
import { useEffect } from "react";
import { BigNumber, utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store/store";
import { setBalance } from "../store/reducers/profileSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const decimalBalance = useSelector((state: RootState) => state.profile.balance);

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const balance = useEtherBalance(account);

    const handleConnectWallet = () => {
        activateBrowserWallet();
    };

    useEffect(() => {
        const bigNumber = BigNumber.from(balance ?? "0");
        const number = utils.formatEther(bigNumber);

        dispatch(setBalance(number));
    }, [account, balance]);

    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
            }
        };

        window.ethereum?.on('accountsChanged', handleAccountsChanged);

        return () => {
            window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [account]);


    return (
        <Container>
            <NavBar account={account} deactivate={deactivate} decimalBalance={decimalBalance} handleConnectWallet={handleConnectWallet} />
            <StakeForm decimalBalance={decimalBalance} />
        </Container>
    );
}

export default HomePage;