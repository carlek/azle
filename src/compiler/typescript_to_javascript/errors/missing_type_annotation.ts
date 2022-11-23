import { TypeAliasDeclaration, TypeReferenceNode } from 'typescript';
import {
    convertFileRangeToLineRange,
    getLineNumber,
    Snippet,
    snippetsToDisplayString
} from '../annotations';

export function createMissingTypeArgumentErrorMessage(
    typeAliasDeclaration: TypeAliasDeclaration
): string {
    const sourceFile = typeAliasDeclaration.getSourceFile();

    const typeAliasDeclarationSourceCode = sourceFile.text.substring(
        typeAliasDeclaration.pos,
        typeAliasDeclaration.end
    );

    const typeReferenceNode = typeAliasDeclaration.type as TypeReferenceNode;
    const typeReferenceNodeLineNumber = getLineNumber(sourceFile, [
        typeReferenceNode.pos,
        typeReferenceNode.end
    ]);

    const errorSnippet: Snippet = {
        title: {
            annotationType: 'Error',
            label: 'Generic type "Canister" requires one type argument'
        },
        location: {
            path: sourceFile.fileName,
            line: typeReferenceNodeLineNumber,
            column: convertFileRangeToLineRange(sourceFile, [
                typeReferenceNode.pos,
                typeReferenceNode.end
            ])[1]
        },
        source: typeAliasDeclarationSourceCode
    };

    const helpSnippet: Snippet = {
        title: {
            annotationType: 'Help',
            label: 'Specify a type literal as a type argument to "Canister"'
        }
    };

    return `Azle requirement violation.\n\n${snippetsToDisplayString([
        errorSnippet,
        helpSnippet
    ])}`;
}
