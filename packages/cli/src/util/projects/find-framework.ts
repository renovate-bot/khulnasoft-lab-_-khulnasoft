import { Framework, frameworks } from '@khulnasoft/frameworks';

export function findFramework(slug?: string | null) {
  return (frameworks as any as Framework[]).find(f => f.slug === slug);
}
