import { useState } from 'react';

interface StakeFormProps {
    decimalBalance: string;
}

const StakeForm = (props: StakeFormProps) => {
    const { decimalBalance } = props;

    const [stakeAmount, setStakeAmount] = useState('');

    const setMaxAmount = () => {
        setStakeAmount(decimalBalance);
    }

    const stakeAmountInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStakeAmount(decimalBalance);
    }

    return (
        <div className="flex flex-col mx-auto mt-24 w-1/3 items-center justify-center">
            <form
                className="flex flex-col items-center w-full mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <h1 className="text-4xl my-4 w-full text-center text-white tracking-widest">Input your amount</h1>
                <div className="relative w-1/2 m-auto">
                    <input
                        type="text"
                        id="amount"
                        className="w-full p-2.5 outline-none bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-16"
                        placeholder="Enter amount"
                        value={stakeAmount}
                        onChange={stakeAmountInputHandler}
                    />
                    <div
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                        onClick={setMaxAmount}
                    >
                        Max
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    Stake
                </button>
            </form>
        </div>
    );
};

export default StakeForm;
