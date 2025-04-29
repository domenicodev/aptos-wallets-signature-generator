import { createMessage, ethereum_caip, ethereum_address, deadline } from './message';

export async function signWithWallet({
  walletType,
  wallet,
  walletPublicKey,
  razorWallet,
  log,
  logHeader,
  setSigning,
}) {
  setSigning(true);
  try {
    if (!walletType || !walletPublicKey) throw new Error('Wallet not connected');
    const message = createMessage(walletPublicKey, ethereum_caip, ethereum_address, deadline);
    const messageHex = '0x' + message.toString('hex');
    let signature;
    if (walletType === 'pontem') {
      logHeader('pontem wallet');
      log('Attempting to sign with Pontem wallet...');
      log(`Message to sign: ${messageHex}`);
      const signatureResponse = await wallet.signMessage({ message: messageHex, nonce: '0' });
      log('Signature response:');
      log(JSON.stringify(signatureResponse, null, 2));
      if (!signatureResponse || !signatureResponse.result) throw new Error('Invalid response from wallet');
      const signatureBytes = new Uint8Array(64);
      for (let i = 0; i < 64; i++) signatureBytes[i] = signatureResponse.result.signature[i];
      signature = Array.from(signatureBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    } else if (walletType === 'nightly') {
      logHeader('nightly wallet');
      log('Attempting to sign with Nightly wallet...');
      log(`Message to sign: ${messageHex}`);
      const msgToSign = { message: messageHex, nonce: '0' };
      const signatureResponse = await wallet.features["aptos:signMessage"].signMessage(msgToSign);
      log('Signature response:');
      log(JSON.stringify(signatureResponse, null, 2));
      if (!signatureResponse || !signatureResponse.args || !signatureResponse.args.signature) throw new Error('Invalid signature response from wallet');
      const signatureData = signatureResponse.args.signature.data.data;
      const signatureBytes = new Uint8Array(64);
      for (let i = 0; i < 64; i++) signatureBytes[i] = signatureData[i];
      signature = Array.from(signatureBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      log('Extracted signature: ' + signature);
    } else if (walletType === 'petra') {
      logHeader('petra wallet');
      log('Attempting to sign with Petra wallet...');
      log(`Message to sign: ${messageHex}`);
      const signatureResponse = await wallet.signMessage({ message: messageHex, application: undefined, nonce: '0' });
      log('Signature response:');
      log(JSON.stringify(signatureResponse, null, 2));
      if (signatureResponse && signatureResponse.signature) {
        if (typeof signatureResponse.signature === 'string') signature = signatureResponse.signature.replace(/^0x/, '');
        else if (Array.isArray(signatureResponse.signature) || signatureResponse.signature instanceof Uint8Array) signature = Array.from(signatureResponse.signature).map(b => b.toString(16).padStart(2, '0')).join('');
        else if (typeof signatureResponse.signature === 'object') {
          const signatureBytes = new Uint8Array(64);
          for (let i = 0; i < 64; i++) signatureBytes[i] = signatureResponse.signature[i];
          signature = Array.from(signatureBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        } else throw new Error('Unsupported signature format');
      } else throw new Error('No signature found in response');
      log('Extracted signature: ' + signature);
    } else if (walletType === 'razor') {
      logHeader('razor wallet');
      log('Attempting to sign with Razor wallet...');
      log(`Message to sign: ${messageHex}`);
      const signatureResponse = await razorWallet.signMessage({ message: messageHex, nonce: '0' });
      log('Signature response:');
      log(JSON.stringify(signatureResponse, null, 2));
      if (
        signatureResponse &&
        signatureResponse.args &&
        signatureResponse.args.signature &&
        signatureResponse.args.signature.data &&
        signatureResponse.args.signature.data.data
      ) {
        // Extract the signature bytes object
        const sigObj = signatureResponse.args.signature.data.data;
        // Convert to Uint8Array
        const signatureBytes = new Uint8Array(
          Object.keys(sigObj)
            .sort((a, b) => Number(a) - Number(b))
            .map(k => sigObj[k])
        );
        // Convert to hex string
        signature = Array.from(signatureBytes)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        log('Extracted signature: ' + signature);
      } else {
        throw new Error("No signature found in response");
      }
    }
    logHeader('aptos values');
    log('Signature: ' + signature);
    log('\nValues for Move test:');
    log(`let public_key = x"${walletPublicKey}";`);
    log(`let ethereum_caip = string::utf8(b"${ethereum_caip}");`);
    log(`let eth_address = x"${ethereum_address}";`);
    log(`let deadline = ${deadline}u64; // timestamp`);
    log(`let signature_bytes = x"${signature}";`);
  } catch (error) {
    log('Signing error: ' + (error.message || error.toString()));
  }
  setSigning(false);
} 