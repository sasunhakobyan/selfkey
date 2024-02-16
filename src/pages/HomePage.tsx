import { useEtherBalance, useEthers } from "@usedapp/core";
import NavBar from "../components/NavBar";
import Form from "../components/Form";
import Container from "../components/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setBalance } from "../store/profileSlice";
import { getNumber } from "../utils/getNumber";

import useMinStakeAmount from "../hooks/useMinStakeAmount";

import logo from '../assets/logo.webp';

const HomePage = () => {
    const dispatch = useDispatch();
    const accountBalance = useSelector((state: RootState) => state.profile.balance);

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const balance = useEtherBalance(account);



    const minStakeAmount = useMinStakeAmount();

    const handleConnectWallet = () => {
        activateBrowserWallet();
    };

    useEffect(() => {
        if (balance) {
            const number = getNumber(balance);
            dispatch(setBalance(number));
        }
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
            <div className="absolute w-36 h-36 bg-transparent shadow-blueGlow"></div>
            <div className="absolute w-36 h-36 bg-transparent shadow-pinkGlow"></div>

            <NavBar account={account} deactivate={deactivate} accountBalance={accountBalance} handleConnectWallet={handleConnectWallet} />
            <Form accountBalance={accountBalance} minStakeAmount={minStakeAmount} contract={contract} account={account} />
            <footer className="flex justify-center items-center h-40 border-t border-t-slate-900">
                <img className='w-44 object-contain' src={logo} />
            </footer>
        </Container>
    );
}

export default HomePage;