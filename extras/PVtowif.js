const bip39 = require('bip39');
const bitcore = require('bitcore-lib');  // Import bitcore-lib

// Recovery phrase (replace with your actual phrase)
const recoveryPhrase = "duty chuckle camp oven armed dinner there frame elder course expect six";

// Step 1: Convert the recovery phrase to a seed
const seed = bip39.mnemonicToSeedSync(recoveryPhrase);

// Step 2: Derive the private key using BIP32 (HD Wallet)
const HDPrivateKey = bitcore.HDPrivateKey.fromSeed(seed);

// Step 3: Get the private key.
// Radiant SLIP-0044 path (Radiant Core v3.0.0+): m/44'/512'/0'/0/0
// Legacy path used by pre-v3.0.0 Radiant wallets:  m/44'/0'/0'/0/0
// Match the path that was used when the seed was generated, otherwise the
// derived address (and any funds at it) will not match the original wallet.
const privateKey = HDPrivateKey.derive("m/44'/512'/0'/0/0").privateKey;

// Step 4: Convert the private key to WIF format
const wif = privateKey.toWIF();

// Output the private key in WIF format
console.log("Private Key (WIF):", wif);
