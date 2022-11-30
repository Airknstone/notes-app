export default function capitalizeWord(word: string): string {
  const transformLowerCase = word.toLowerCase();
  return word.charAt(0).toUpperCase() + transformLowerCase.slice(1);
}
