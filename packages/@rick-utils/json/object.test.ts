import { expect, test } from 'vitest';
import { isObjectOrJsonString } from './isObjectOrJsonString';
import { safeJsonParse } from './safeJsonParse';

test('safeJsonParse()', () => {
  const obj = { name: 'rick' };
  expect(safeJsonParse(JSON.stringify(obj))).toEqual(obj);
  expect(safeJsonParse(undefined)).toEqual({});
  expect(safeJsonParse(undefined, '')).toEqual('');
});

test('isObjectOrJsonString()', () => {
  expect(isObjectOrJsonString(1)).toBe(false);
  expect(isObjectOrJsonString('1')).toBe(false);
  expect(isObjectOrJsonString('{}')).toBe(true);
  expect(isObjectOrJsonString(false)).toBe(false);
  expect(isObjectOrJsonString(true)).toBe(false);
  expect(isObjectOrJsonString(JSON.stringify({ name: 'rick' }))).toBe(true);
});
