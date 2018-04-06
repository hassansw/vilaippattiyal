declare type OrigValidator = typeof val;declare export interface Extensions {
notEmpty(str: string): boolean,
len(str: string, min: number, max: number): boolean,
isUrl(str: string): boolean,
isIPv6(str: string): boolean,
isIPv4(str: string): boolean,
notIn(str: string, values: string[]): boolean,
regex(str: string, pattern: string, modifiers: string): boolean,
notRegex(str: string, pattern: string, modifiers: string): boolean,
isDecimal(str: string): boolean,
min(str: string, val: number): boolean,
max(str: string, val: number): boolean,
not(str: string, pattern: string, modifiers: string): boolean,
contains(str: string, elem: string[]): boolean,
notContains(str: string, elem: string[]): boolean,
is(str: string, pattern: string, modifiers: string): boolean
} declare export var extensions: Extensions;declare export type Validator = {
contains(str: string, elem: string[]): boolean
} & OrigValidator & Extensions
declare export var validator: Validator;