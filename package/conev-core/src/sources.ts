/* eslint-disable @typescript-eslint/ban-types */

import merge, { Options } from 'deepmerge';

export interface Source {
  export(): Map<string, object>;
}

export class Sources implements Source {
  private readonly sources: Source[];

  private readonly options: Options | undefined;

  constructor(sources: Source[], options: Options | undefined = undefined) {
    this.sources = sources;
    this.options = options;
  }

  add(source: Source, priority: number): Sources {
    if (priority === -1) this.sources.push(source);
    else this.sources.splice(priority, 0, source);

    return this;
  }

  export(): Map<string, object> {
    const configs = this.sources.map((source) => source.export());
    const mergedConfig = new Map<string, object[]>();

    configs.forEach((config) => {
      config.forEach((value, key) => {
        if (!mergedConfig.get(key)) mergedConfig.set(key, []);
        mergedConfig.get(key)?.push(value);
      });
    });

    const config = new Map<string, object>();
    mergedConfig.forEach((value, key) => {
      config.set(key, merge.all(value, this.options));
    });

    return config;
  }
}

export default Sources;

/* eslint-enable @typescript-eslint/ban-types */
