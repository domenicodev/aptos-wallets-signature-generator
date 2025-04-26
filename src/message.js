import { Buffer } from './Buffer';

export const ethereum_caip = 'eip155:1';
export const ethereum_address = '00000000000000000000000048f56b44e079ae862db1112c2023927fde3dd395';
export const deadline = 1745511628626000;

export function createMessage(publicKey, caip, caipAddress, deadline) {
  publicKey = publicKey.replace(/^0x/, '');
  const pubKeyBuf = Buffer.from(publicKey, 'hex');
  const caipBuf = Buffer.from(caip, 'utf8');
  const caipAddrBuf = Buffer.from(caipAddress, 'hex');
  const deadlineBuf = Buffer.alloc(8);
  deadlineBuf.writeBigUInt64LE(BigInt(deadline));
  return Buffer.concat([pubKeyBuf, caipBuf, caipAddrBuf, deadlineBuf]);
} 