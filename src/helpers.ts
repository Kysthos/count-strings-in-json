/**
 * Returns an array of trimmed strings from an array/object etc.
 * @param input Any valid javascript data
 */
const extractStrings = (input: any) => {
  const strings: string[] = [];

  const rec = (obj: any) => {
    if (obj === null) return;
    if (Array.isArray(obj)) {
      for (const el of obj) rec(el);
    } else if (typeof obj === "object") {
      for (const [key, val] of Object.entries(obj)) rec(val);
    } else if (typeof obj === "string") {
      strings.push(obj.trim());
    }
    return;
  };

  rec(input);

  return strings;
};

interface Stats {
  str: string;
  count: number;
}

/**
 * Counts occurences of strings in an array
 * @param strings array of strings
 */
const countStrings = (strings: string[]): Stats[] => {
  const occurences: { [key: string]: number } = {};

  for (const el of strings) {
    occurences[el] || (occurences[el] = 0);
    occurences[el]++;
  }

  const stats: Stats[] = [];

  for (const [str, count] of Object.entries(occurences))
    stats.push({ str, count });

  return stats.sort((a, b) => b.count - a.count);
};

/**
 * Aligns a given string to the right
 * @param str string to be aligned
 * @param width expected width of the whole aligned string (fill + str)
 * @param [fill] optional fill, default = " "
 */
const alignRight = (str: string, width: number, fill = " ") => {
  const fillWidth = width - str.length;
  return fill.repeat(fillWidth < 0 ? 0 : fillWidth) + str;
};

/**
 * Creates human readable stats
 * @param stats array of stat objects
 */
const formatStats = (stats: Stats[]) => {
  let formatted = "";
  // calculate the longest number
  const longestNumber = Math.max(
    ...stats.map((stat) => String(stat.count).length)
  );

  for (const { str, count } of stats)
    formatted += `${alignRight(String(count), longestNumber)}     ${str}\n`;
  return formatted;
};

export { extractStrings, countStrings, formatStats };
