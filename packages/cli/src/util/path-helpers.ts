import { relative as nativeRelative } from 'path';
import { normalizePath } from '@khulnasoft/build-utils';

export function relative(a: string, b: string): string {
  return normalizePath(nativeRelative(a, b));
}
