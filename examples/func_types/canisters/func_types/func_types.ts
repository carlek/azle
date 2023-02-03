import {
    Func,
    $init,
    nat64,
    ok,
    Opt,
    Principal,
    $query,
    StableBTreeMap,
    $update,
    Variant,
    Query,
    Update
} from 'azle';
import { Notifier, NotifierFunc } from '../notifiers/types';

let stable_storage = new StableBTreeMap<string, StableFunc>(0, 25, 1_000);

type User = {
    id: string;
    basic_func: BasicFunc;
    complex_func: ComplexFunc;
};

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;
type ComplexFunc = Func<(user: User, reaction: Reaction) => Update<nat64>>;
type StableFunc = Func<(param1: nat64, param2: string) => Query<void>>;
type NullFunc = Func<
    (
        param1: Opt<null>,
        param2: null[],
        param3: null,
        param4: null[][],
        param5: Opt<null>[]
    ) => Query<null>
>;

$init;
export function init_() {
    stable_storage.insert('stable_func', [
        Principal.from('aaaaa-aa'),
        'start_canister'
    ]);
}

$query;
export function get_stable_func(): StableFunc {
    return (
        stable_storage.get('stable_func') ?? [
            Principal.from('aaaaa-aa'),
            'raw_rand'
        ]
    );
}

$query;
export function basic_func_param(basic_func: BasicFunc): BasicFunc {
    return basic_func;
}

$query;
export function null_func_param(null_func: NullFunc): NullFunc {
    return null_func;
}

$query;
export function basic_func_param_array(basic_func: BasicFunc[]): BasicFunc[] {
    return basic_func;
}

$query;
export function basic_func_return_type(): BasicFunc {
    return [Principal.fromText('aaaaa-aa'), 'create_canister'];
}

$query;
export function basic_func_return_type_array(): BasicFunc[] {
    return [
        [Principal.fromText('aaaaa-aa'), 'create_canister'],
        [Principal.fromText('aaaaa-aa'), 'update_settings'],
        [Principal.fromText('aaaaa-aa'), 'install_code']
    ];
}

$query;
export function complex_func_param(complex_func: ComplexFunc): ComplexFunc {
    return complex_func;
}

$query;
export function complex_func_return_type(): ComplexFunc {
    return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
}

type GetNotifierFromNotifiersCanisterResult = Variant<{
    ok: NotifierFunc;
    err: string;
}>;

$update;
export async function get_notifier_from_notifiers_canister(): Promise<GetNotifierFromNotifiersCanisterResult> {
    const notifiers_canister: Notifier = new Notifier(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
    );

    const result = await notifiers_canister.get_notifier().call();

    if (!ok(result)) {
        return {
            err: result.err
        };
    }

    return {
        ok: result.ok
    };
}
