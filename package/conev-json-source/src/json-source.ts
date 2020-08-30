export default class JsonSource {
  private readonly jsons: Map<string, Record<string, unknown>>;

  constructor() {
    this.jsons = new Map<string, Record<string, unknown>>();
  }

  set(env: string, json: Record<string, unknown>): JsonSource {
    this.jsons.set(env, json);

    return this;
  }

  export(): Map<string, Record<string, unknown>> {
    return this.jsons;
  }
}
