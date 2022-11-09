export function parseKey(value: string): string {
  const splitItems = value.split('-')
  let str = ''
  splitItems.forEach((splitItem) => {
    str = `${str}${splitItem.charAt(0).toUpperCase()}${splitItem.slice(1)} `;
  })

  str = str.trim()
  return str;
}