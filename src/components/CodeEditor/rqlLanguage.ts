import {languages} from 'monaco-editor';

const TRANSFORMS = [
    "aggregate",
    "append",
    "create",
    "derive",
    "deferred",
    "filter",
    "from",
    "group",
    "join",
    "map",
    "select",
    "sort",
    "take",
    "union",
    "view",
    "with"
];

const MODULES = ["date", "math", "text"];
const BUILTIN_FUNCTIONS = ["case"];
const KEYWORDS = ["set" ];
const LITERALS = ["undefined", "true", "false"];

export const rqlLanguageDefinition: languages.IMonarchLanguage = {
    defaultToken: 'invalid',
    ignoreCase: true,

    keywords: [
        ...TRANSFORMS,
        ...MODULES,
        ...BUILTIN_FUNCTIONS,
        ...KEYWORDS,
        ...LITERALS,
    ],

    operators: [
        "+", "-", "*", "/", "//", "%",
        "=", "==", "!=", "->", "=>", ">", "<", ">=", "<=", "~=",
        "&&", "||", "??"
    ],

    tokenizer: {
        root: [
            // Comments
            [/#.*/, 'comment'],

            // Named arguments
            [/(\w+)\s*:/, 'key'],

            // Identifiers and keywords (case insensitive)
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],

            // Whitespace
            {include: '@whitespace'},

            // Brackets
            [/[()[\]]/, '@brackets'],

            // Numbers with underscores support
            [/[+-]?(?:[\d_]+(?:\.[\d_]+)?|\.[\d_]+)/, 'number'],

            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, {token: 'string.quote', bracket: '@open', next: '@string'}],

            // Single-quoted strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/'/, {token: 'string.quote', bracket: '@open', next: '@singlestring'}],

            // Operators
            [/[+\-*/%]/, 'operator'],
            [/\/\//, 'operator'],
            [/==|!=|->|=>|>=|<=|~=|>|</, 'operator'],
            [/&&|\|\||\?\?/, 'operator'],
        ],

        string: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape'],
            [/"/, {token: 'string.quote', bracket: '@close', next: '@pop'}],
        ],

        singlestring: [
            [/[^\\']+/, 'string'],
            [/\\./, 'string.escape'],
            [/'/, {token: 'string.quote', bracket: '@close', next: '@pop'}],
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],

        comment: [
            [/[^/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            [/\*\//, 'comment', '@pop'],
            [/[/*]/, 'comment']
        ],
    }
};

export const rqlLanguageConfiguration: languages.LanguageConfiguration = {
    comments: {
        lineComment: '#',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"', notIn: ['string']},
        {open: "'", close: "'", notIn: ['string']}
    ],
    surroundingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"'},
        {open: "'", close: "'"}
    ],
    folding: {
        offSide: true
    }
};

export const rqlCompletionProvider: languages.CompletionItemProvider = {
    provideCompletionItems: (model, position, context, token) => {
        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        const suggestions: languages.CompletionItem[] = [
            // Transforms
            ...TRANSFORMS.map(keyword => ({
                label: keyword,
                kind: languages.CompletionItemKind.Keyword,
                insertText: keyword,
                documentation: `RQL transform: ${keyword}`,
                range,
            })),

            // Modules
            ...MODULES.map(module => ({
                label: module,
                kind: languages.CompletionItemKind.Module,
                insertText: module,
                documentation: `RQL module: ${module}`,
                range,
            })),

            // Built-in functions
            ...BUILTIN_FUNCTIONS.map(func => ({
                label: func,
                kind: languages.CompletionItemKind.Function,
                insertText: func,
                documentation: `RQL function: ${func}`,
                range,
            })),

            // Keywords
            ...KEYWORDS.map(keyword => ({
                label: keyword,
                kind: languages.CompletionItemKind.Keyword,
                insertText: keyword,
                documentation: `RQL keyword: ${keyword}`,
                range,
            })),

            // Literals
            ...LITERALS.map(literal => ({
                label: literal,
                kind: languages.CompletionItemKind.Constant,
                insertText: literal,
                documentation: `RQL literal: ${literal}`,
                range,
            })),
        ];

        return {suggestions};
    }
};