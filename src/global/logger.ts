export function logger (logType: string, message: string, fileName: string) {
  console.log("\n\n___________________________________________________________________");
  console.log("\nLOGGER: " + logType.toUpperCase() + '\n');
  console.log(logType + ' message:\n',message);
  console.log('\nFile name where logger is called: ', fileName);
  console.log("___________________________________________________________________\n\n");
}