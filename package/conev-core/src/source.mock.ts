import { Source } from './sources';

export default class SourceMock implements Source {
  private readonly map: Map<string, Record<string, unknown>>;

  constructor(map: Map<string, Record<string, unknown>>) {
    this.map = map;
  }

  export(): Map<string, Record<string, unknown>> {
    return this.map;
  }
}
