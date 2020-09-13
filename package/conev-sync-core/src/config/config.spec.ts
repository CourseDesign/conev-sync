import Config from './config';
import SourceMock from '../source/source.mock';

describe('config', () => {
  const values1 = new Map<string, Record<string, unknown>>([
    ['default', { source: '1', port: 3000, db: { type: 'postgres' } }],
    ['develop', { env: 'develop', port: 3001 }],
  ]);
  const source1 = new SourceMock(values1);

  const values2 = new Map<string, Record<string, unknown>>([
    [
      'default',
      {
        source: '2',
        port: 3000,
        db: { port: 7070, username: 'test', type: 'mysql' },
      },
    ],
    ['production', { env: 'production', port: 3002 }],
  ]);
  const source2 = new SourceMock(values2);

  test('get', () => {
    const config = new Config([source1, source2], ['default', 'develop']);

    expect(config.get()).toEqual({
      source: '2',
      env: 'develop',
      port: 3001,
      db: { port: 7070, username: 'test', type: 'mysql' },
    });
    expect(config.get('source')).toEqual('2');
    expect(config.get('port')).toEqual(3001);
    expect(config.get('db.port')).toEqual(7070);
  });

  test('sync', () => {
    const config = new Config([source1, source2], ['default', 'develop']);

    expect(config.get()).toEqual({
      source: '2',
      env: 'develop',
      port: 3001,
      db: { port: 7070, username: 'test', type: 'mysql' },
    });
    expect(config.get('source')).toEqual('2');
    expect(config.get('port')).toEqual(3001);
    expect(config.get('db.port')).toEqual(7070);

    values2.set('develop', { port: 3002 });
    config.sync();

    expect(config.get()).toEqual({
      source: '2',
      env: 'develop',
      port: 3002,
      db: { port: 7070, username: 'test', type: 'mysql' },
    });
    expect(config.get('source')).toEqual('2');
    expect(config.get('port')).toEqual(3002);
    expect(config.get('db.port')).toEqual(7070);
  });
});
