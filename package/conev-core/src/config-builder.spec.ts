import ConfigBuilder from './config-builder';
import SourceMock from './source.mock';

describe('config-builder', () => {
  const source1 = new SourceMock(
    new Map<string, Record<string, unknown>>([
      ['default', { source: '1', port: 3000, db: { type: 'postgres' } }],
      ['develop', { env: 'develop', port: 3001 }],
    ])
  );

  const source2 = new SourceMock(
    new Map<string, Record<string, unknown>>([
      [
        'default',
        {
          source: '2',
          port: 3000,
          db: { port: 7070, username: 'test', type: 'mysql' },
        },
      ],
      ['production', { env: 'production', port: 3002 }],
    ])
  );

  test('build', () => {
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
