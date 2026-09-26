function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalized = string.toLowerCase().replaceAll(' ', '');
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}


function extractDigits(input) {
  const string = String(input);
  const digits = string.replace(/\D/g, '');
  return digits === '' ? NaN : Number(digits);
}

export { checkStringLength, isPalindrome, extractDigits };
