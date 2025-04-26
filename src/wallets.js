export async function connectPontem({ log, logHeader, setWalletType, setWallet, setWalletPublicKey }) {
  try {
    logHeader('pontem wallet');
    if (!window.pontem) throw new Error('Pontem wallet not found. Please install the Pontem wallet extension.');
    const pontem = window.pontem;
    setWalletType('pontem');
    setWallet(pontem);
    await pontem.connect();
    const account = await pontem.account();
    log(`Connected to Pontem wallet: ${account.address}`);
    let pubKey = await pontem.publicKey();
    if (!pubKey) throw new Error('Could not get public key from Pontem wallet');
    if (typeof pubKey === 'string') pubKey = pubKey.replace(/^0x/, '');
    else pubKey = Buffer.from(pubKey).toString('hex');
    setWalletPublicKey(pubKey);
    log(`Public Key: ${pubKey}`);
  } catch (error) {
    log('Pontem wallet connection error: ' + error.message);
  }
}

export async function connectNightly({ log, logHeader, setWalletType, setWallet, setWalletPublicKey }) {
  try {
    logHeader('nightly wallet');
    if (!window.nightly?.aptos) throw new Error('Nightly wallet not found. Please install the Nightly wallet extension.');
    const nightly = window.nightly.aptos;
    setWalletType('nightly');
    setWallet(nightly);
    await nightly.connect();
    const account = await nightly.getAccount();
    if (!account) throw new Error('Could not get account from Nightly wallet');
    let pubKey = account.publicKey;
    if (!pubKey) throw new Error('Could not get public key from Nightly wallet');
    if (typeof pubKey === 'string') pubKey = pubKey.replace(/^0x/, '');
    else if (pubKey instanceof Uint8Array || Array.isArray(pubKey)) pubKey = Array.from(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else if (typeof pubKey === 'object') pubKey = Object.values(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else throw new Error('Public key is in an unsupported format: ' + typeof pubKey);
    setWalletPublicKey(pubKey);
    log(`Connected to Nightly wallet: ${account.address}`);
    log(`Public Key: ${pubKey}`);
  } catch (error) {
    log('Nightly wallet connection error: ' + error.message);
  }
}

export async function connectPetra({ log, logHeader, setWalletType, setWallet, setWalletPublicKey }) {
  try {
    logHeader('petra wallet');
    if (!window.petra) throw new Error('Petra wallet not found. Please install the Petra wallet extension.');
    const petra = window.petra;
    setWalletType('petra');
    setWallet(petra);
    await petra.connect();
    const account = await petra.account();
    if (!account) throw new Error('Could not get account from Petra wallet');
    log(`Connected to Petra wallet: ${account.address}`);
    let pubKey = account.publicKey;
    if (!pubKey) throw new Error('Could not get public key from Petra wallet');
    if (typeof pubKey === 'string') pubKey = pubKey.replace(/^0x/, '');
    else if (pubKey instanceof Uint8Array || Array.isArray(pubKey)) pubKey = Array.from(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else if (typeof pubKey === 'object') pubKey = Object.values(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else throw new Error('Public key is in an unsupported format: ' + typeof pubKey);
    setWalletPublicKey(pubKey);
    log(`Public Key: ${pubKey}`);
  } catch (error) {
    log('Petra wallet connection error: ' + error.message);
  }
}

export async function connectRazor({ log, logHeader, setWalletType, setWallet, setWalletPublicKey, razorWallet }) {
  try {
    logHeader('razor wallet');
    setWalletType('razor');
    setWallet(razorWallet);
    if (!razorWallet.connected) {
      log('Please use the Connect button below to connect Razor wallet.');
      return;
    }
    const account = razorWallet.account;
    if (!account) throw new Error('Could not get account from Razor wallet');
    let pubKey = account.publicKey;
    if (!pubKey) throw new Error('Could not get public key from Razor wallet');
    if (typeof pubKey === 'string') pubKey = pubKey.replace(/^0x/, '');
    else if (pubKey instanceof Uint8Array || Array.isArray(pubKey)) pubKey = Array.from(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else if (typeof pubKey === 'object') pubKey = Object.values(pubKey).map(b => b.toString(16).padStart(2, '0')).join('');
    else throw new Error('Public key is in an unsupported format: ' + typeof pubKey);
    setWalletPublicKey(pubKey);
    log(`Connected to Razor wallet: ${account.address}`);
    log(`Public Key: ${pubKey}`);
  } catch (error) {
    log('Razor wallet connection error: ' + error.message);
  }
} 