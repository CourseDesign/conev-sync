import { ConfigBuilder, JsonSource } from './index';

describe('conev', () => {
  const source1 = new JsonSource();
  source1.set('default', { source: '1', port: 3000 });
  source1.set('develop', { env: 'develop', port: 3001 });

  const source2 = new JsonSource();
  source2.set('default', {
    source: '2',
    port: 3000,
    db: { port: 7070, username: 'test', type: 'mysql' },
  });
  source2.set('production', { env: 'production', port: 3002 });

  test('get', () => {
    const config = new ConfigBuilder()
      .addSource(source1, source2)
      .addEnv('default', 'develop')
      .build();

    expect(config.get()).toEqual({
      source: '2',
      env: 'develop',
      port: 3001,
      db: { port: 7070, username: 'test', type: 'mysql' },
    });
    expect(config.get('source')).toEqual('2');
    expect(config.get('db.port')).toEqual(7070);
  });
});
