// Glue short words (up to 3 letters: в, и, по, для, при, без, the, for…)
// to the next word with a non-breaking space so they never hang at the end
// of a line. The lookbehind keeps chains like «их с навигатором» intact.
const SHORT_WORD = /(?<=^|[\s(«"„])([A-Za-zА-Яа-яЁё]{1,3})\s+/g

export function typograph(text) {
  if (!text) return text
  return text
    .replace(SHORT_WORD, '$1 ')
    .replace(/\s+([—–→])\s/g, ' $1 ')
}
