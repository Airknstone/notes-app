export default function capitalizeWord(word: string): string {
  console.log(word);
  /* Removes all white spaces */
  let removeWhiteSPace = word.replace(/\s/g, '');
  /* removes any non Alphabetical stringd */
  removeWhiteSPace = removeWhiteSPace.replace(/[^a-zA-Z0-9 ]/g, '');
  let transformLowerCase = removeWhiteSPace.toLocaleLowerCase();
  transformLowerCase = transformLowerCase.charAt(0).toUpperCase();
  console.log(transformLowerCase + removeWhiteSPace.slice(1));
  return transformLowerCase + removeWhiteSPace.slice(1);;
  /*  return word.charAt(0).toUpperCase() + transformLowerCase.slice(1); */
}
