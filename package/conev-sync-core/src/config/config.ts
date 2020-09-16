import merge, { Options } from 'deepmerge';
import Sources from '../source/sources';
import Source from '../source/source';
import Cache from '../cache/cache';

export default class Config {
  private readonly sources: Sources;

  private readonly options?: Options;

  private readonly envs: string[];

  private values: Record<string, unknown> | null;

  private cache: Cache<string, unknown>;

  constructor(sources: Source[], envs: string[], options?: Options) {
    this.sources = new Sources(sources, options);
    this.envs = envs;
    this.options = options;
    this.values = null;
    this.cache = new Cache((key: string) => this.getValue(key));

    this.sync();
  }

  sync(): Config {
    this.cache.refresh();

    const source = this.sources.export();
    const configs = this.envs
      .map((env) => source.get(env))
      .filter((value) => value != null) as Record<string, unknown>[];

    this.values = merge.all(configs, this.options) as Record<string, unknown>;

    return this;
  }

  get(key = ''): unknown | undefined {
    return this.cache.get(key);
  }

  private getValue(key = ''): unknown | undefined {
    const tokens: string[] = key.split('.').reverse();

    let current: any = this.values;
    for (
      let token = tokens.pop();
      token != null && token.length > 0;
      token = tokens.pop()
    ) {
      if (current == null) return null;
      current = current[token];
    }

    return current;
  }
}
