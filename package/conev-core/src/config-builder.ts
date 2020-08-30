import { Options } from 'deepmerge';
import { Source } from './sources';

export default class ConfigBuilder {
  private readonly sources: Source[] = [];

  private readonly envs: string[] = [];

  private options: Options | undefined = undefined;

  addSource(...sources: Source[]): ConfigBuilder {
    this.sources.push(...sources);

    return this;
  }

  addEnv(...envs: string[]): ConfigBuilder {
    this.envs.push(...envs);

    return this;
  }

  setOptions(options: Options | undefined): ConfigBuilder {
    this.options = options;

    return this;
  }
}
