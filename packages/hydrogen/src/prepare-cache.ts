import { glob } from '@khulnasoft/build-utils';
import type { PrepareCache } from '@khulnasoft/build-utils';

export const prepareCache: PrepareCache = ({ repoRootPath, workPath }) => {
  return glob('**/node_modules/**', repoRootPath || workPath);
};
