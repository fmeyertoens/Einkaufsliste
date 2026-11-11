const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidTime(time: string): boolean {
  return timePattern.test(time);
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function combineDateAndTime(date: Date, time: string): Date {
  const match = timePattern.exec(time);
  if (Number.isNaN(date.getTime()) || !match) {
    throw new RangeError('Ungültiges Datum oder ungültige Uhrzeit');
  }

  const result = new Date(date);
  result.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return result;
}
