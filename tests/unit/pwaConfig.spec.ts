import { describe, expect, it } from 'vitest';
import { workboxOptions } from '../../workbox.config';

describe('PWA precache configuration', () => {
  it('ignores the icon font version while preserving Workbox defaults', () => {
    const isIgnored = (parameter: string) =>
      workboxOptions.ignoreURLParametersMatching.some((pattern) =>
        pattern.test(parameter)
      );

    expect(['v', 'utm_source', 'fbclid'].map(isIgnored)).toEqual([
      true,
      true,
      true,
    ]);
    expect(['version', 'verbose', 'other'].map(isIgnored)).toEqual([
      false,
      false,
      false,
    ]);
  });
});
