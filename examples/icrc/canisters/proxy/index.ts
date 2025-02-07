import {
    ic,
    match,
    nat,
    nat8,
    Opt,
    Principal,
    $query,
    Record,
    text,
    Tuple,
    $update,
    Variant,
    Vec
} from 'azle';
import {
    ICRC1Account,
    ICRC,
    ICRC1TransferArgs,
    ICRC1TransferError,
    ICRC1Value
} from 'azle/canisters/icrc';

const icrc = new ICRC(
    Principal.fromText(
        process.env.ICRC_PRINCIPAL ??
            ic.trap('process.env.ICRC_PRINCIPAL is undefined')
    )
);

$query;
export async function icrc1_metadata(): Promise<
    Vec<Tuple<[text, ICRC1Value]>>
> {
    const result = await icrc.icrc1_metadata().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_name(): Promise<text> {
    const result = await icrc.icrc1_name().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_symbol(): Promise<text> {
    const result = await icrc.icrc1_symbol().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_decimals(): Promise<nat8> {
    const result = await icrc.icrc1_decimals().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_fee(): Promise<nat> {
    const result = await icrc.icrc1_fee().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_total_supply(): Promise<nat> {
    const result = await icrc.icrc1_total_supply().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_minting_account(): Promise<Opt<ICRC1Account>> {
    const result = await icrc.icrc1_minting_account().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_balance_of(account: ICRC1Account): Promise<nat> {
    const result = await icrc.icrc1_balance_of(account).call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function icrc1_transfer(
    transferArgs: ICRC1TransferArgs
): Promise<Variant<{ Ok: nat; Err: ICRC1TransferError }>> {
    const result = await icrc.icrc1_transfer(transferArgs).call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$query;
export async function icrc1_supported_standards(): Promise<
    Vec<Record<{ name: text; url: text }>>
> {
    const result = await icrc.icrc1_supported_standards().call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}
