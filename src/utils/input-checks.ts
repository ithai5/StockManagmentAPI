
export const isNumberRegex = (input: any): boolean => {
  return /^[0-9]+$/.test(input);
}


// TODO : Remove this method if doesn't get used - refactor if possible if used 
export const isNumberRegexMinMax = (input: any, min: number, max: number): boolean => {
  if(isNumberRegex(input)){
    return min <= input && input <= max;
  } else {
    return false;
  }
}


