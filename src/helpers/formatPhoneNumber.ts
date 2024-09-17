export default function formatPhoneNumber(text: string): string {
  const cleaned = text.replace(/\D/g, '');

  if (cleaned.length !== 11) {
    return text;
  }

  const countryConde = cleaned.slice(0, 1);
  const areaCode = cleaned.slice(1, 4);
  const centralOfficeCode = cleaned.slice(4, 7);
  const lineNumber = cleaned.slice(7);

  return `+${countryConde} (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
}
