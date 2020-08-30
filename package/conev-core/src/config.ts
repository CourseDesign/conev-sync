import merge, { Options } from 'deepmerge';
import Sources, { Source } from './sources';

export default class Config {
  private readonly sources: Sources;

  private readonly options: Options | undefined;

  private readonly envs: string[];

  private values: Record<string, unknown> | null;

  constructor(
    sources: Source[],
    envs: string[],
    options: Options | undefined = undefined
  ) {
    this.sources = new Sources(sources, options);
    this.envs = envs;
    this.options = options;
    this.values = null;

    this.sync();
  }

  sync(): Config {
    const source = this.sources.export();
    const configs = this.envs
      .map((env) => source.get(env))
      .filter((value) => value != null) as Record<string, unknown>[];

    this.values = merge.all(configs.reverse(), this.options) as Record<
      string,
      unknown
    >;

    return this;
  }

  get(key = ''): unknown | null {
    const tokens = key.split('.');

    let current: any = this.values;
    const token = tokens.pop();
    while (token != null) {
      if (current == null) return null;
      current = current[token];
    }

    return current;
  }
}
