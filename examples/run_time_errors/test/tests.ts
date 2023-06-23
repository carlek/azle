import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        ...getThrownErrorTests(errorCanister),
        ...getInvalidOptTests(errorCanister),
        ...getInvalidPrimitiveTests(errorCanister),
        ...getInvalidNumberTests(errorCanister),
        ...getInvalidFuncTests(errorCanister)
    ];
}

function getThrownErrorTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        expectError('throw big int', errorCanister.throwBigint, '3'),
        expectError('throw boolean', errorCanister.throwBoolean, 'false'),
        expectError(
            'throw class',
            errorCanister.throwClass,
            'CustomClass toString'
        ),
        expectError(
            'throw custom error',
            errorCanister.throwCustomError,
            'Error: This is a custom error'
        ),
        expectError('throw int', errorCanister.throwInt, '3'),
        expectError('throw null', errorCanister.throwNull, 'null'),
        expectError(
            'throw null reference',
            errorCanister.throwNullReference,
            "TypeError: cannot convert 'null' or 'undefined' to object"
        ),
        expectError(
            'throw object',
            errorCanister.throwObject,
            '[object Object]'
        ),
        expectError('throw rational', errorCanister.throwRational, '3.14'),
        expectError('throw string', errorCanister.throwString, 'Hello World'),
        expectError('throw symbol', errorCanister.throwSymbol, 'Symbol()'),
        expectError(
            'throw undefined',
            errorCanister.throwUndefined,
            'undefined'
        )
    ];
}

function getInvalidOptTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        expectError(
            'return non object',
            errorCanister.returnNonObject,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with both Some and None',
            errorCanister.returnBothSomeAndNone,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with neither Some nor None',
            errorCanister.returnObjectWithNeitherSomeNorNone,
            "TypeError: value is not of type 'Opt'"
        ),
        expectError(
            'return object with non null None value',
            errorCanister.returnNonNullNone,
            "TypeError: value is not of type 'null'"
        ),
        expectError(
            'return object with invalid Some value',
            errorCanister.returnInvalidSomeValue,
            "TypeError: value is not of type 'string'"
        )
    ];
}

function getInvalidPrimitiveTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        // expectError(
        //     'return invalid blob value',
        //     errorCanister.returnInvalidBlobValue,
        //     "TypeError: value is not of type 'blob'"
        // ),
        expectError(
            'return invalid boolean value',
            errorCanister.returnInvalidBooleanValue,
            "TypeError: value is not of type 'boolean'"
        ),
        expectError(
            'return invalid empty value',
            errorCanister.returnInvalidEmptyValue,
            "TypeError: value cannot be converted into type 'empty'"
        ),
        expectError(
            'return invalid null value',
            errorCanister.returnInvalidNullValue,
            "TypeError: value is not of type 'null'"
        ),
        expectError(
            'return invalid string value',
            errorCanister.returnInvalidStringValue,
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid text value',
            errorCanister.returnInvalidTextValue,
            // TODO: Consider saying "value is not of type 'text'"
            "TypeError: value is not of type 'string'"
        ),
        expectError(
            'return invalid void value',
            errorCanister.returnInvalidVoidValue,
            "TypeError: value is not of type 'void'"
        )
    ];
}

function getInvalidNumberTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        expectError(
            'return invalid number',
            errorCanister.returnInvalidNumber,
            // TODO: change this to "TypeError: value is not of type 'number'"
            "TypeError: value is not of type 'float64'"
        ),
        expectError(
            'return invalid int',
            errorCanister.returnInvalidInt,
            "TypeError: value is not of type 'int'"
        ),
        expectError(
            'return invalid int8',
            errorCanister.returnInvalidInt8,
            "TypeError: value is not of type 'int8'"
        ),
        expectError(
            'return invalid int16',
            errorCanister.returnInvalidInt16,
            "TypeError: value is not of type 'int16'"
        ),
        expectError(
            'return invalid int32',
            errorCanister.returnInvalidInt32,
            "TypeError: value is not of type 'int32'"
        ),
        expectError(
            'return invalid int64',
            errorCanister.returnInvalidInt64,
            "TypeError: value is not of type 'int64'"
        ),
        expectError(
            'return invalid nat',
            errorCanister.returnInvalidNat,
            "TypeError: value is not of type 'nat'"
        ),
        expectError(
            'return invalid nat8',
            errorCanister.returnInvalidNat8,
            "TypeError: value is not of type 'nat8'"
        ),
        expectError(
            'return invalid nat16',
            errorCanister.returnInvalidNat16,
            "TypeError: value is not of type 'nat16'"
        ),
        expectError(
            'return invalid nat32',
            errorCanister.returnInvalidNat32,
            "TypeError: value is not of type 'nat32'"
        ),
        expectError(
            'return invalid nat64',
            errorCanister.returnInvalidNat64,
            "TypeError: value is not of type 'nat64'"
        ),
        expectError(
            'return invalid float32',
            errorCanister.returnInvalidFloat32,
            "TypeError: value is not of type 'float32'"
        ),
        expectError(
            'return invalid float64',
            errorCanister.returnInvalidFloat64,
            "TypeError: value is not of type 'float64'"
        )
    ];
}

function getInvalidFuncTests(errorCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        expectError(
            'return a non-array value as an invalid Func',
            errorCanister.returnNonArrayValueAsInvalidFunc,
            "TypeError: value is not of type 'Func'"
        ),
        expectError(
            'return an empty object as an invalid Func',
            errorCanister.returnEmptyObjectAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: expected 'Array', given 'Object'\n}"
        ),
        expectError(
            'return an empty array as an invalid Func',
            errorCanister.returnEmptyArrayAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is undefined\n}"
        ),
        expectError(
            'return a non-principal value as an invalid Func',
            errorCanister.returnNonPrincipalValueAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is not of type 'Principal' {\n    [cause]: TypeError: value is not of type 'Principal'\n  }\n}"
        ),
        expectError(
            'return an empty object for a principal as an invalid Func',
            errorCanister.returnEmptyObjectPrincipalAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is not of type 'Principal' {\n    [cause]: TypeError: property 'toText' of object is not a function\n  }\n}"
        ),
        expectError(
            'return array with only a principal as an invalid Func',
            errorCanister.returnArrayWithOnlyPrincipalAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '1' is undefined\n}"
        ),
        expectError(
            'return a non-string canister method name as an invalid Func',
            errorCanister.returnNonStringCanisterMethodNameAsInvalidFunc,
            "[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '1' is not of type 'string' {\n    [cause]: TypeError: value is not of type 'string'\n  }\n}"
        )
    ];
}

/** Creates a test that asserts the provided method throws the provided value */
function expectError(
    /** The name of the test */
    name: string,
    /** The method to call */
    canisterMethod: () => Promise<any>,
    /** The value we expect the method to throw */
    expectedValue: any
): Test {
    return {
        name,
        test: async () => {
            return {
                Ok: await testThrow(canisterMethod, expectedValue)
            };
        }
    };
}

async function testThrow(
    errorFunc: () => Promise<void>,
    expectedError: string
): Promise<boolean> {
    return checkErrorMessage(await getErrorMessage(errorFunc), expectedError);
}

async function getErrorMessage(errorFunc: () => Promise<any>): Promise<any> {
    try {
        await errorFunc();
    } catch (err) {
        return err;
    }
}

function checkErrorMessage(actualError: any, expectedError: string) {
    return (
        'result' in actualError &&
        'reject_message' in actualError.result &&
        actualError.result.reject_message.includes(`Uncaught ${expectedError}`)
    );
}
