import assert from 'assert';
import { getScriptName } from '../src';

describe('Test `getScriptName()`', () => {
  it('should return "vercel-*"', () => {
    const pkg = {
      scripts: {
        'vercel-dev': '',
        'khulnasoft-build': '',
        dev: '',
        build: '',
      },
    };
    assert.equal(
      getScriptName(pkg, ['vercel-dev', 'now-dev', 'dev']),
      'vercel-dev'
    );
    assert.equal(
      getScriptName(pkg, ['khulnasoft-build', 'now-build', 'build']),
      'khulnasoft-build'
    );
    assert.equal(getScriptName(pkg, ['dev']), 'dev');
    assert.equal(getScriptName(pkg, ['build']), 'build');
  });

  it('should return "now-*"', () => {
    const pkg = {
      scripts: {
        'now-dev': '',
        'now-build': '',
        dev: '',
        build: '',
      },
    };
    assert.equal(
      getScriptName(pkg, ['vercel-dev', 'now-dev', 'dev']),
      'now-dev'
    );
    assert.equal(
      getScriptName(pkg, ['khulnasoft-build', 'now-build', 'build']),
      'now-build'
    );
    assert.equal(getScriptName(pkg, ['dev']), 'dev');
    assert.equal(getScriptName(pkg, ['build']), 'build');
  });

  it('should return base script name', () => {
    const pkg = {
      scripts: {
        dev: '',
        build: '',
      },
    };
    assert.equal(getScriptName(pkg, ['dev']), 'dev');
    assert.equal(getScriptName(pkg, ['build']), 'build');
  });

  it('should return `null`', () => {
    assert.equal(getScriptName(undefined, ['build']), null);
    assert.equal(getScriptName({}, ['build']), null);
    assert.equal(getScriptName({ scripts: {} }, ['build']), null);

    const pkg = {
      scripts: {
        dev: '',
        build: '',
      },
    };
    assert.equal(getScriptName(pkg, ['vercel-dev', 'now-dev']), null);
    assert.equal(getScriptName(pkg, ['khulnasoft-build', 'now-build']), null);
  });
});
