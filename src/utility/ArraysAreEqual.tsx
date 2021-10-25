/**
 * Checks whether two arrays are equal
 * @param a is the first array to compare
 * @param b is the second array to compare
 * @returns whether the two given arrays are equal
 */

 export default function arraysAreEqual<T>(a:T[], b:T[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}