import { TabOptions } from "../types/TabOptions"

interface TabProps {
    tab: TabOptions;
    setTab: (tab: TabOptions) => void;
}

const Tab = (props: TabProps) => {
    const { tab, setTab } = props;

    return (
        <div className='flex justify-between items-center'>
            <span onClick={() => setTab(TabOptions.Deposit)} className={`cursor-pointer inline-block px-4 py-3 rounded-lg border border-transparent text-black font-semibold ${tab === TabOptions.Deposit ? 'bg-neonBlue' : 'bg-white'}`}>Deposit</span>
            <span className='mx-5'></span>
            <span onClick={() => setTab(TabOptions.Withdraw)} className={`cursor-pointer inline-block px-4 py-3 rounded-lg border border-transparent text-black font-semibold ${tab === TabOptions.Withdraw ? 'bg-neonPink' : 'bg-white'}`}>Withdraw</span>
        </div>
    )
}

export default Tab;