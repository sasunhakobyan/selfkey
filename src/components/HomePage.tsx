import { useEtherBalance, useEthers } from "@usedapp/core";
import NavBar from "./layout/NavBar";
import Container from "./layout/Container";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount, setBalance, setMinStakeAmount } from "../store/profileSlice";
import logo from '../assets/logo.webp';
import useMinStakeAmount from "../hooks/useMinStakeAmount";
import { TabOptions } from "../types/TabOptions";
import Tab from "./Tab";
import StakeForm from "./StakeForm";
import WithdrawForm from "./WithdrawForm";
import GlowEffect from "./layout/GlowEffect";

const HomePage = () => {
    const [tab, setTab] = useState<TabOptions>(TabOptions.Stake);

    const { activateBrowserWallet, account, deactivate } = useEthers();

    const dispatch = useDispatch();
    const balance = useEtherBalance(account);
    const minStakeAmount = useMinStakeAmount();

    useEffect(() => {
        balance && dispatch(setBalance(balance.toString()));
        dispatch(setAccount(account));

        minStakeAmount && dispatch(setMinStakeAmount(minStakeAmount.value.toString()));
    }, [balance, account, minStakeAmount]);

    const handleConnectWallet = () => {
        activateBrowserWallet();
    };

    const renderTab = useCallback(() => {
        if (tab == TabOptions.Stake) {
            return <StakeForm />
        } else {
            return <WithdrawForm />
        }
    }, [tab]);

    return (
        <Container>
            <GlowEffect />
            <NavBar deactivate={deactivate} handleConnectWallet={handleConnectWallet} />

            {
                account
                    ? (
                        <div className="flex flex-col mx-auto w-1/3 items-center justify-center">
                            <Tab tab={tab} setTab={setTab} />
                            {renderTab()}
                        </div>
                    )
                    : (
                        <h1 className="text-4xl my-8 w-full text-center text-white tracking-widest">Please login for Stake/Withdraw</h1>)
            }

            <footer className="flex justify-center items-center h-40 border-t border-t-slate-900">
                <img className='w-44 object-contain' src={logo} />
            </footer>
        </Container>
    );
}

export default HomePage;