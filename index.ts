import { Principal } from '@dfinity/principal';

// TODO it would be great if we could allow importing this file (azle bare specifier) into frontends or Node.js
// TODO but it isn't quite set up to do that right now

declare var globalThis: any;

export const ic: ic = globalThis.ic;

// TODO perhaps this should just be provided through calling
// TODO the management canister
// ic.rawRand = function() {
//     return {
//         name: 'rawRand'
//     } as any;
// };

// TODO this needs to be included in all code even if the user has not imported anything concrete from azle
// globalThis.console = {
//     ...globalThis.console,
//     log: (...args: any[]) => {
//         ic.print(...args);
//     }
// };

ic.stableStorage = function () {
    return (ic as any)._azleStableStorage;
};

// ic.call = function* (...args) {
//     return yield {
//         name: 'call',
//         args: [
//             arguments.callee.name,
//             ...args
//         ]
//     } as any;
// };

ic.call_raw = function (...args) {
    return {
        name: 'call_raw',
        args
    } as any;
};

ic.call_raw128 = function (...args) {
    return {
        name: 'call_raw128',
        args
    } as any;
};

type ic = {
    accept_message: () => void;
    // call: (
    //     canisterId: Principal,
    //     methodName: string,
    //     ...args: any[]
    // ) => Generator; // TODO improve type inference here, try to get rid of the type parameters
    call_raw: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat64
    ) => CanisterResult<blob>;
    call_raw128: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat
    ) => CanisterResult<blob>;
    caller: () => Principal;
    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    canister_balance: () => nat64;
    canister_balance128: () => nat;
    data_certificate: () => Opt<blob>;
    id: () => Principal;
    method_name: () => string;
    msg_cycles_accept: (max_amount: nat64) => nat64;
    msg_cycles_accept128: (max_amount: nat) => nat;
    msg_cycles_available: () => nat64;
    msg_cycles_available128: () => nat;
    msg_cycles_refunded: () => nat64;
    msg_cycles_refunded128: () => nat;
    print: (...args: any) => void;
    reject: (message: string) => void;
    reject_code: () => RejectionCode;
    reject_message: () => string;
    stableStorage: <T>() => T;
    time: () => nat64;
    trap: (message: string) => never;
};

export type Migrate<T> = T;
export type PreUpgrade = void;
export type PostUpgrade = void;
export type Heartbeat = void | Generator;
export type Init = void;
export type InspectMessage = void;
export type Query<T> = T;
export type QueryManual<T> = void;
// export type QueryAsync<T> = Generator<T>; // TODO enable once this is resolved: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754
export type Update<T> = T;
export type UpdateManual<T> = void;
export type Oneway = void;
// TODO we should change the type of UpdateAsync to force the dev to yield if possible
export type UpdateAsync<T> = Generator<any, T, any>; // TODO to be stricter we may want the last parameter to be unknown: https://github.com/demergent-labs/azle/issues/138
// TODO the generator types are not exactly correct...but at least I've given the user the Async type
export type Async<T> = Generator<any, T, any>; // TODO to be stricter we may want the last parameter to be unknown: https://github.com/demergent-labs/azle/issues/138
export type Canister<T> = T;
export type Variant<T> = Partial<T>;
export type Opt<T> = T | null;
// export type Result<T, V> = {
//     ok?: T;
//     err?: V;
// };
// export type CallResult<T> = Generator<
//     any,
//     Variant<{
//         ok?: T;
//         err?: string;
//     }>,
//     any
// >;
// export type CallResult<T> = Variant<{
//     ok?: T;
//     err?: string;
// }>;
export type CanisterResult<T> = Variant<{
    ok?: T;
    err?: string;
}>;
export type Stable<T> = T;

export type int = bigint;
export type int64 = bigint;
export type int32 = number;
export type int16 = number;
export type int8 = number;

export type nat = bigint;
export type nat64 = bigint;
export type nat32 = number;
export type nat16 = number;
export type nat8 = number;

export type float32 = number;
export type float64 = number;

export type blob = Uint8Array;

export type reserved = any;
export type empty = never;

type AzleResult<T> = Variant<{
    ok: T;
    err: string;
}>;

type Ok<T> = {
    ok: NonNullable<T>;
};

export function ok<T>(azle_result: AzleResult<T>): azle_result is Ok<T> {
    if (azle_result.err === undefined) {
        return true;
    } else {
        return false;
    }
}

// TODO working on turning the ok function into an assertion
export function attempt<T>(callback: () => AzleResult<T>): AzleResult<T> {
    try {
        return callback();
    } catch (error) {
        return error as AzleResult<T>;
    }
}

// TODO type this more strictly
export type Func<
    T extends (...args: any[]) => Query<any> | Update<any> | Oneway
> = [Principal, string];

export { Principal } from '@dfinity/principal';

export type RejectionCode = Variant<{
    NoError: null;
    SysFatal: null;
    SysTransient: null;
    DestinationInvalid: null;
    CanisterReject: null;
    CanisterError: null;
    Unknown: null;
}>;
