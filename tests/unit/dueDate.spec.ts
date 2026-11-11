import { describe, expect, it } from 'vitest';
import {
  combineDateAndTime,
  formatTime,
  isValidTime,
} from '@/services/dueDate';

describe('due dates', () => {
  it('combines the selected local date and time without mutating the date', () => {
    const selectedDate = new Date(2026, 9, 9, 23, 59, 45);
    const dueDate = combineDateAndTime(selectedDate, '04:30');

    expect([
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
      dueDate.getHours(),
      dueDate.getMinutes(),
      dueDate.getSeconds(),
    ]).toEqual([2026, 9, 9, 4, 30, 0]);
    expect(selectedDate.getHours()).toBe(23);
  });

  it('formats times with leading zeroes', () => {
    expect(formatTime(new Date(2026, 0, 1, 0, 5))).toBe('00:05');
    expect(formatTime(new Date(2026, 0, 1, 9, 7))).toBe('09:07');
  });

  it.each(['24:00', '10:60', '9:30', 'not a time'])(
    'rejects invalid time %s',
    (time) => {
      expect(isValidTime(time)).toBe(false);
      expect(() => combineDateAndTime(new Date(), time)).toThrow(RangeError);
    }
  );

  it('rejects invalid dates', () => {
    expect(() => combineDateAndTime(new Date(NaN), '12:00')).toThrow(RangeError);
  });
});
