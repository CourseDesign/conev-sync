import Sources from './sources';
import SourceMock from './source.mock';

describe('sources', () => {
  const source1 = new SourceMock(
    new Map<string, Record<string, unknown>>([
      ['default', { source: '1', port: 3000 }],
      ['develop', { env: 'develop', port: 3001 }],
    ])
  );

  const source2 = new SourceMock(
    new Map<string, Record<string, unknown>>([
      ['default', { source: '2', port: 3000, db: 'postgres' }],
      ['production', { env: 'production', port: 3002 }],
    ])
  );

  test('export', () => {
    const sources = new Sources([source1, source2]);
    const config = sources.export();

    expect(config.get('default')).toEqual({
      source: '2',
      port: 3000,
      db: 'postgres',
    });

    expect(config.get('develop')).toEqual({
      env: 'develop',
      port: 3001,
    });

    expect(config.get('production')).toEqual({
      env: 'production',
      port: 3002,
    });
  });

  test('add', () => {
    const sources = new Sources([]);

    sources.add(source1).add(source2);

    const config = sources.export();

    expect(config.get('default')).toEqual({
      source: '2',
      port: 3000,
      db: 'postgres',
    });

    expect(config.get('develop')).toEqual({
      env: 'develop',
      port: 3001,
    });

    expect(config.get('production')).toEqual({
      env: 'production',
      port: 3002,
    });
  });
});
