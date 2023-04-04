import { CallResult, nat, Service, serviceQuery, Variant } from 'azle';

export type StringQueryResult = Variant<{
    Ok: string;
    Err: string;
}>;

export type NatQueryResult = Variant<{
    Ok: nat;
    Err: string;
}>;

export class Canister1 extends Service {
    @serviceQuery
    incCounter: () => CallResult<nat>;
}
