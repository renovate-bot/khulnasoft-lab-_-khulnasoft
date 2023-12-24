import { sortBuilders } from '../../../../src/util/build/sort-builders';

describe('sortBuilders()', () => {
  test.each([
    {
      name: 'should sort @khulnasoft/next from middle to beginning',
      input: ['@khulnasoft/node', '@khulnasoft/next', '@khulnasoft/python'],
      output: ['@khulnasoft/next', '@khulnasoft/node', '@khulnasoft/python'],
    },
    {
      name: 'should sort @khulnasoft/static-build from middle to beginning',
      input: [
        '@khulnasoft/node',
        '@khulnasoft/static-build',
        '@khulnasoft/python',
      ],
      output: [
        '@khulnasoft/static-build',
        '@khulnasoft/node',
        '@khulnasoft/python',
      ],
    },
    {
      name: 'should sort @vercel/remix from end to beginning',
      input: [
        '@khulnasoft/python',
        '@khulnasoft/node',
        '@khulnasoft/remix-builder',
      ],
      output: [
        '@khulnasoft/remix-builder',
        '@khulnasoft/python',
        '@khulnasoft/node',
      ],
    },
    {
      name: 'should sort @khulnasoft/redwood from beginning to beginning',
      input: ['@khulnasoft/redwood', '@khulnasoft/python', '@khulnasoft/ruby'],
      output: ['@khulnasoft/redwood', '@khulnasoft/python', '@khulnasoft/ruby'],
    },
    {
      name: 'should sort @khulnasoft/hydrogen from end to beginning',
      input: ['@khulnasoft/python', '@khulnasoft/hydrogen'],
      output: ['@khulnasoft/hydrogen', '@khulnasoft/python'],
    },
    {
      name: 'should sort @khulnasoft/static-build to beginning with many @khulnasoft/node',
      input: [
        '@khulnasoft/node',
        '@khulnasoft/node',
        '@khulnasoft/node',
        '@khulnasoft/static-build',
        '@khulnasoft/node',
      ],
      output: [
        '@khulnasoft/static-build',
        '@khulnasoft/node',
        '@khulnasoft/node',
        '@khulnasoft/node',
        '@khulnasoft/node',
      ],
    },
  ])('$name', ({ input, output }) => {
    const builders = sortBuilders(input.map(use => ({ use })));
    expect(builders.map(b => b.use)).toEqual(output);
  });
});
