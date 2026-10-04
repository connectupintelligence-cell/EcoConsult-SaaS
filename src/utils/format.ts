export const formatDateBR = (isoString: string | null | undefined): string => {
  if (!isoString) return '-';
  // Check if it's already DD/MM/YYYY
  if (isoString.includes('/')) return isoString;
  
  try {
    // Handling "YYYY-MM-DD"
    const [year, month, day] = isoString.split('T')[0].split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return isoString;
  } catch (e) {
    return isoString;
  }
};
