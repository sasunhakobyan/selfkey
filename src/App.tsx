import { ChainId, DAppProvider } from '@usedapp/core'
import HomePage from './components/HomePage';

function App() {
  const config = {
    readOnlyChainId: ChainId.Mumbai,
    readOnlyUrls: {
      [ChainId.Mumbai]: "https://polygon-mumbai-bor.publicnode.com"
    },
  };

  return (
    <DAppProvider config={config}>
      <HomePage />
    </DAppProvider>
  )
}

export default App