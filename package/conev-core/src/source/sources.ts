import merge, { Options } from 'deepmerge';
import Source from './source';

class Sources implements Source {
  private readonly sources: Source[];

  private readonly options?: Options;

  constructor(sources: Source[], options?: Options) {
    this.sources = sources;
    this.options = options;
  }

  add(source: Source, priority = -1): Sources {
    if (priority === -1) this.sources.push(source);
    else this.sources.splice(priority, 0, source);

    return this;
  }

  export(): Map<string, Record<string, unknown>> {
    const configs = this.sources.map((source) => source.export());
    const mergedConfig = new Map<string, Record<string, unknown>[]>();

    configs.forEach((config) => {
      config.forEach((value, key) => {
        if (!mergedConfig.get(key)) mergedConfig.set(key, []);
        mergedConfig.get(key)?.push(value);
      });
    });

    const config = new Map<string, Record<string, unknown>>();
    mergedConfig.forEach((value, key) => {
      config.set(
        key,
        merge.all(value, this.options) as Record<string, unknown>
      );
    });

    return config;
  }
}

export default Sources;
