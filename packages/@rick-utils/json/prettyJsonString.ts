import { safeJsonParse } from './safeJsonParse';

export function prettyJsonString(value: string | object) {
  return JSON.stringify(safeJsonParse(value), null, 2);
}
