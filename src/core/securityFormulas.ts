export const generatePassword = (
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string => {
  let charset = '';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useNumbers) charset += '0123456789';
  if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export const calculateEntropy = (
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): number => {
  let charsetSize = 0;
  if (useLowercase) charsetSize += 26;
  if (useUppercase) charsetSize += 26;
  if (useNumbers) charsetSize += 10;
  if (useSymbols) charsetSize += 32;
  return Math.log2(Math.pow(charsetSize, length));
};
