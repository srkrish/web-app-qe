/**
 * Represents an object with string or number properties
 */
interface SortableItem {
  [key: string]: string | number;
}

/**
 * Sort array of objects with string values in ascending order
 *
 * @param data Array of objects to sort
 * @param property Property name to sort by
 * @returns Sorted array
 */
export function sortAsc<T extends SortableItem>(data: T[], property: keyof T): T[] {
  return [...data].sort((a, b) => {
    const aVal = String(a[property]);
    const bVal = String(b[property]);
    return aVal.localeCompare(bVal);
  });
}

/**
 * Sort array of objects with string values in descending order
 *
 * @param data Array of objects to sort
 * @param property Property name to sort by
 * @returns Sorted array
 */
export function sortDesc<T extends SortableItem>(data: T[], property: keyof T): T[] {
  return [...data].sort((a, b) => {
    const aVal = String(a[property]);
    const bVal = String(b[property]);
    return bVal.localeCompare(aVal);
  });
}

/**
 * Sort array of objects with numeric values in ascending order (low to high)
 *
 * @param data Array of objects to sort
 * @param property Property name to sort by
 * @returns Sorted array
 */
export function sortLoHi<T extends SortableItem>(data: T[], property: keyof T): T[] {
  return [...data].sort((a, b) => Number(a[property]) - Number(b[property]));
}

/**
 * Sort array of objects with numeric values in descending order (high to low)
 *
 * @param data Array of objects to sort
 * @param property Property name to sort by
 * @returns Sorted array
 */
export function sortHiLo<T extends SortableItem>(data: T[], property: keyof T): T[] {
  return [...data].sort((a, b) => Number(b[property]) - Number(a[property]));
}