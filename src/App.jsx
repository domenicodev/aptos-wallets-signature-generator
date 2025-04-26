import React from 'react';
import { WalletProvider } from '@razorlabs/razorkit';
import GenerateSig from './GenerateSig';

function App() {
  return (
    <WalletProvider>
      <GenerateSig />
    </WalletProvider>
  );
}

export default App;
