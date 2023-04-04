import { blob, match, $update, Variant } from 'azle';
import {
    BitcoinNetwork,
    GetUtxosResult,
    managementCanister,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

const BITCOIN_API_CYCLE_COST = 100_000_000n;
const BITCOIN_BASE_TRANSACTION_COST = 5_000_000_000n;
const BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE = 20_000_000n;

$update;
export async function getBalance(address: string): Promise<
    Variant<{
        Ok: Satoshi;
        Err: string;
    }>
> {
    return await managementCanister
        .bitcoin_get_balance({
            address,
            min_confirmations: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function getCurrentFeePercentiles(): Promise<
    Variant<{
        Ok: MillisatoshiPerByte[];
        Err: string;
    }>
> {
    return await managementCanister
        .bitcoin_get_current_fee_percentiles({
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function getUtxos(address: string): Promise<
    Variant<{
        Ok: GetUtxosResult;
        Err: string;
    }>
> {
    return await managementCanister
        .bitcoin_get_utxos({
            address,
            filter: null,
            network: BitcoinNetwork.Regtest
        })
        .cycles(BITCOIN_API_CYCLE_COST)
        .call();
}

$update;
export async function sendTransaction(transaction: blob): Promise<
    Variant<{
        Ok: boolean;
        Err: string;
    }>
> {
    const transactionFee =
        BITCOIN_BASE_TRANSACTION_COST +
        BigInt(transaction.length) * BITCOIN_CYCLE_COST_PER_TRANSACTION_BYTE;

    const callResult = await managementCanister
        .bitcoin_send_transaction({
            transaction,
            network: BitcoinNetwork.Regtest
        })
        .cycles(transactionFee)
        .call();

    return match(callResult, {
        Ok: () => ({ Ok: true }),
        Err: (err) => ({ Err: err })
    });
}
