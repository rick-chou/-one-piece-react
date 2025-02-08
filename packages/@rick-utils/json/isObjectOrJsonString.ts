import { isObject, isString } from 'lodash-es';

export function isObjectOrJsonString(value: any) {
  if (isObject(value)) {
    return true;
  }

  if (isString(value)) {
    try {
      return isObject(JSON.parse(value));
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return false;
}
