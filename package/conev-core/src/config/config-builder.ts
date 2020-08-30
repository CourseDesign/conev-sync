import { Options } from 'deepmerge';
import Config from './config';
import { Source } from '../../dist';

export default class ConfigBuilder {
  private readonly sources: Source[] = [];

  private readonly envs: string[] = [];

  private options?: Options;

  addSource(...sources: Source[]): ConfigBuilder {
    this.sources.push(...sources);

    return this;
  }

  addEnv(...envs: string[]): ConfigBuilder {
    this.envs.push(...envs);

    return this;
  }

  setOptions(options?: Options): ConfigBuilder {
    this.options = options;

    return this;
  }

  build(): Config {
    return new Config(this.sources, this.envs, this.options);
  }
}
