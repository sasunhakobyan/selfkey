import { useContractFunction } from '@usedapp/core';
import { Contract } from 'ethers';
import { useState } from 'react';

import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import { TabOptions } from '../types/TabOptions';
import Tab from './Tab';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import useStakedBalance from '../hooks/useStakedBalance';
import useMinStakeAmount, { useStackContract } from '../hooks/useMinStakeAmount';

interface FormProps {
    accountBalance: string;
    account?: string;
}

export interface IFormInput {
    amount: string;
}

const Form = (props: FormProps) => {
    const { accountBalance, account } = props;
    const contract = useStackContract();
    const { value: minStakeAmount } = useMinStakeAmount();

    const { state: stakeStatus, send } = useContractFunction(contract, 'stake', { transactionName: 'Stake' });
    const { state: withdrawStatus, send: withdraw } = useContractFunction(contract, 'withdraw', { transactionName: 'Withdraw' });

    const stakedBalance = useStakedBalance(contract, account);

    const [tab, setTab] = useState<TabOptions>(TabOptions.Deposit);

    const depositModal = useModal(stakeStatus.status);
    const withdrawModal = useModal(withdrawStatus.status);

    return (
        <div className="flex flex-col mx-auto w-1/3 items-center justify-center">
            {depositModal && <Modal {...depositModal} />}
            {withdrawModal && <Modal {...withdrawModal} />}

            <Tab tab={tab} setTab={setTab} />
            {
                tab === TabOptions.Deposit ? (
                    <DepositForm accountBalance={accountBalance} minStakeAmount={minStakeAmount} tab={tab} sendStake={send} />
                ) : (
                    <WithdrawForm stakeBalance={stakedBalance || "0"} tab={tab} contract={contract} minStakeAmount={minStakeAmount} withdraw={withdraw} />
                )
            }
        </div>
    );
};

export default Form;
