import type { IParseOptions, IStringifyOptions } from 'qs'
import qs from 'qs'

const stringifyOptions: IStringifyOptions = {
    encodeValuesOnly: true,
    sort: (a: string, b: string) => a.localeCompare(b),
    allowDots: true,
    arrayFormat: 'brackets'
}

const parseOptions: IParseOptions & { decoder?: never | undefined } = {
    allowPrototypes: true,
    allowDots: true
}

const parse = (val: string) => qs.parse(val, parseOptions)

const stringify = (query: any) => qs.stringify(query, stringifyOptions)

const query = () => parse(window.location.search.replace('?', '')) || {}

export { stringifyOptions, parseOptions, parse, stringify, query }

export default {
    stringifyOptions,
    parseOptions,
    parse,
    stringify,
    query
}
