const ecc = require('eosjs-ecc');
const Fcbuffer = require('fcbuffer');
const Eos = require('eosjs');


var signTransaction = function (unsigned, chainId, wif) {

    const eos = Eos({});
    const Transaction = eos.fc.structs.transaction

    const buf = Fcbuffer.toBuffer(Transaction, unsigned.transaction)
    const chain_id_buf = new Buffer(chainId, 'hex')
    const sign_buf = Buffer.concat([chain_id_buf, buf, new Buffer(new Uint8Array(32))])
    const sig = ecc.sign(sign_buf, wif)

    const output = {
        compression: 'none',
        transaction: unsigned.transaction,
        signatures: [sig],
    }

    return JSON.stringify(output);
}

signTransaction();