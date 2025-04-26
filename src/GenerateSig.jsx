import React, { useState } from 'react';
import { useWallet, ConnectButton } from '@razorlabs/razorkit';
import '@razorlabs/razorkit/style.css';
import { createMessage, ethereum_caip, ethereum_address, deadline } from './message';
import { connectPontem, connectNightly, connectPetra, connectRazor } from './wallets';
import { styles, responsiveStyle } from './styles';
import { getLogUtils } from './logUtils';
import { signWithWallet } from './signWithWallet';

export default function GenerateSig() {
  const razorWallet = useWallet();
  const [walletType, setWalletType] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walletPublicKey, setWalletPublicKey] = useState(null);
  const [output, setOutput] = useState('Welcome to ED25519 Signature Generator\nPlease connect your wallet');
  const [signing, setSigning] = useState(false);

  const { log, logHeader, clearLogs } = getLogUtils(setOutput);

  // Wallet connect handlers
  async function handleConnectPontem() {
    await connectPontem({ log, logHeader, setWalletType, setWallet, setWalletPublicKey });
  }
  async function handleConnectNightly() {
    await connectNightly({ log, logHeader, setWalletType, setWallet, setWalletPublicKey });
  }
  async function handleConnectPetra() {
    await connectPetra({ log, logHeader, setWalletType, setWallet, setWalletPublicKey });
  }
  async function handleConnectRazor() {
    await connectRazor({ log, logHeader, setWalletType, setWallet, setWalletPublicKey, razorWallet });
  }

  // Sign message handler
  async function handleSignWithWallet() {
    await signWithWallet({
      walletType,
      wallet,
      walletPublicKey,
      razorWallet,
      log,
      logHeader,
      setSigning,
    });
  }

  return (
    <>
      <style>{responsiveStyle}</style>
      <div className="sig-container" style={styles.container}>
        <h1 style={styles.h1}>ED25519 Signature Generator</h1>
        <div>
          <button style={styles.button} onClick={handleConnectPontem}>Connect Pontem Wallet</button>
          <button style={styles.button} onClick={handleConnectNightly}>Connect Nightly Wallet</button>
          <button style={styles.button} onClick={handleConnectPetra}>Connect Petra Wallet</button>
          <button style={styles.button} onClick={handleConnectRazor}>Connect Razor Wallet</button>
        </div>
        <div>
          <button
            style={signing || !walletType || !walletPublicKey ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            onClick={handleSignWithWallet}
            disabled={!walletType || !walletPublicKey || signing}
          >
            {signing ? 'Signing...' : 'Sign Message'}
          </button>
          <button style={styles.button} onClick={clearLogs}>Clear Logs</button>
        </div>
        <div style={styles.connectBtnWrap}>
          {walletType === 'razor' && <ConnectButton />}
        </div>
        <pre id="output" className="sig-output" style={styles.output}>{output}</pre>
      </div>
    </>
  );
} 