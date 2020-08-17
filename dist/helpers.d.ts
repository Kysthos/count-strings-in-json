/**
 * Returns an array of trimmed strings from an array/object etc.
 * @param input Any valid javascript data
 */
declare const extractStrings: (input: any) => string[];
interface Stats {
    str: string;
    count: number;
}
/**
 * Counts occurences of strings in an array
 * @param strings array of strings
 */
declare const countStrings: (strings: string[]) => Stats[];
/**
 * Creates human readable stats
 * @param stats array of stat objects
 */
declare const formatStats: (stats: Stats[]) => string;
export { extractStrings, countStrings, formatStats };
