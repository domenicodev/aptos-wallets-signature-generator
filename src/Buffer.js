// Buffer implementation for browsers
export class Buffer {
  constructor(input, encoding) {
    if (typeof input === 'string') {
      if (encoding === 'hex') {
        this.data = new Uint8Array(input.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      } else if (encoding === 'utf8' || !encoding) {
        this.data = new TextEncoder().encode(input);
      }
    } else if (input instanceof Uint8Array) {
      this.data = input;
    } else if (Array.isArray(input)) {
      this.data = new Uint8Array(input);
    }
  }
  static from(input, encoding) {
    return new Buffer(input, encoding);
  }
  static concat(buffers) {
    const totalLength = buffers.reduce((acc, buf) => acc + buf.data.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of buffers) {
      result.set(buf.data, offset);
      offset += buf.data.length;
    }
    return new Buffer(result);
  }
  static alloc(size) {
    return new Buffer(new Uint8Array(size));
  }
  toString(encoding) {
    if (encoding === 'hex') {
      return Array.from(this.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    return new TextDecoder().decode(this.data);
  }
  writeBigUInt64LE(value, offset = 0) {
    const view = new DataView(this.data.buffer);
    const lowWord = Number(value & 0xffffffffn);
    const highWord = Number(value >> 32n);
    view.setUint32(offset, lowWord, true);
    view.setUint32(offset + 4, highWord, true);
  }
} 