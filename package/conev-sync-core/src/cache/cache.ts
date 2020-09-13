export default class Cache<K, V> {
  private readonly provider: (key: K) => V | undefined;

  private readonly values: Map<K, V>;

  constructor(provider: (key: K) => V | undefined) {
    this.provider = provider;
    this.values = new Map<K, V>();
  }

  refresh(): Cache<K, V> {
    this.values.clear();
    return this;
  }

  get(key: K): V | undefined {
    if (!this.values.has(key)) {
      const value = this.provider(key);
      if (value !== undefined) {
        this.values.set(key, value);
      }
    }
    return this.values.get(key);
  }
}
