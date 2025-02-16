import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did.d';
import { readFileSync } from 'fs';

export function get_tests(bytes_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get_bytes 1 kb',
            test: async () => {
                const file = Array.from(
                    readFileSync('./test/example_files/example_1_kb.txt')
                );

                const result = await bytes_canister.getBytes(file as any);

                return {
                    Ok: result.length === 1_000
                };
            }
        },
        {
            name: 'get_bytes 10 kb',
            test: async () => {
                const file = Array.from(
                    readFileSync('./test/example_files/example_10_kb.txt')
                );

                const result = await bytes_canister.getBytes(file as any);

                return {
                    Ok: result.length === 10_000
                };
            }
        },
        {
            name: 'get_bytes 100 kb',
            test: async () => {
                const file = Array.from(
                    readFileSync('./test/example_files/example_100_kb.txt')
                );

                const result = await bytes_canister.getBytes(file as any);

                return {
                    Ok: result.length === 100_000
                };
            }
        },
        {
            name: 'get_bytes 1000 kb',
            test: async () => {
                const file = Array.from(
                    readFileSync('./test/example_files/example_1000_kb.txt')
                );

                const result = await bytes_canister.getBytes(file as any);

                return {
                    Ok: result.length === 1_000_000
                };
            }
        },
        {
            name: 'get_bytes 2000 kb',
            test: async () => {
                const file = Array.from(
                    readFileSync('./test/example_files/example_2000_kb.txt')
                );

                const result = await bytes_canister.getBytes(file as any);

                return {
                    Ok: result.length === 2_000_000
                };
            }
        }
        // TODO 3000 kb causes the instruction limit to be reached
        // {
        //     name: 'get_bytes 3000 kb',
        //     test: async () => {
        //         const file = Array.from(
        //             readFileSync('./test/example_files/example_3000_kb.txt')
        //         );

        //         const result = await bytes_canister.get_bytes(file);

        //         return {
        //             ok: result.length === 3_000_000
        //         };
        //     }
        // }
    ];
}
