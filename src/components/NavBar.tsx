import logo from '../assets/logo.webp';

interface NavBarProps {
    account: string | undefined;
    deactivate: () => void;
    handleConnectWallet: () => void;
    decimalBalance: string;
}

const NavBar = (props: NavBarProps) => {
    const { account, deactivate, handleConnectWallet, decimalBalance } = props;

    return (
        <div className="flex flex-row items-start justify-between p-10">
            <img className='w-44 object-contain' src={logo} />
            {account ? (
                <div className='p-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-500'>
                    <div className='text-white text-xl'>Balance: {decimalBalance}</div>
                    <button onClick={deactivate} className='w-full mt-4 p-2 rounded-md text-white bg-black bg-opacity-50'>Logout</button>
                </div>
            ) : (
                <button
                    onClick={handleConnectWallet}
                    type="button"
                    className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default NavBar;