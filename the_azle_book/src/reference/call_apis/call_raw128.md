# call raw 128

This section is a work in progress.

Examples:

-   [call_raw](https://github.com/demergent-labs/azle/tree/main/examples/call_raw)

```typescript
import { ic, match, nat, Principal, Result, $update } from 'azle';

$update;
export async function executeCallRaw128(
    canisterId: Principal,
    method: string,
    candidArgs: string,
    payment: nat
): Promise<Result<string, string>> {
    const callResult = await ic.callRaw128(
        canisterId,
        method,
        ic.candidEncode(candidArgs),
        payment
    );

    return match(callResult, {
        Ok: (ok) => ({
            Ok: ic.candidDecode(ok)
        }),
        Err: (err) => ({ Err: err })
    });
}
```
