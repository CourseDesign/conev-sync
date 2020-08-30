import JsonSource from './json-source';

describe('json-source', () => {
  test('export', () => {
    const defaultConfig = { source: '1', port: 3000 };
    const developConfig = { env: 'develop', port: 3001 };

    const source = new JsonSource();
    source.set('default', defaultConfig);
    source.set('develop', developConfig);

    const config = source.export();
    expect(config.get('default')).toEqual(defaultConfig);
    expect(config.get('develop')).toEqual(developConfig);
  });
});
