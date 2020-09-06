# conev-sync
Conev-sync is a synchronous version of [conev](#reference). You can save, manage and use configuration through it.

## Contents

 - [Install](#install)
 - [Usage](#usage)
   - [ConfigBuilder](#configbuilder)
   - [Config](#config)
   - [Source](#source)
   - [Sources](#sources)
   - [JsonSource](#jsonsource)
 - [Example](#example)
 - [Reference](#reference)
## Install
    npm install conev-sync
    
## Usage

Get ConfigBuilder from conev and one or more Sources to use. In this example, the built-in JsonSource is used.

    import {ConfigBuilder, JsonSource} from 'conev-sync';


Then, create Sources and set up.

    const  jsonSource = new  JsonSource();
    
    jsonSource
	    .set('basic', basic) //basic is JSON
	    .set('dev', dev) //dev is JSON
	    .set('prd', prd); //prd is JSON


Create ConfigBuilder and add Environment, Source.

    const builder = new ConfigBuilder();
    
	builder
	    .addEnv('dev', 'basic')
	    .addSource(jsonSource);


Build configuration

    const config = builder.build(); // This is the result of combining dev and basic.


Use configuration

    config.get() // The whole configuration created comes out
	config.get('a.b.c'); // Is same as config.get().a.b.c
 
 
 
*Each of Environments and Sources are merged by [deepmerge](#reference).(What is added first has high priority)*
You can set deepmerge options as follow :

    builder.setOptions(options);


### ConfigBuilder

    class  ConfigBuilder {
		addSource(...sources: Source[]): ConfigBuilder;
		addEnv(...envs: string[]): ConfigBuilder;
		setOptions(options?: Options): ConfigBuilder;
		build(): Config;
	}
`ConfigBuilder` takes a configuration from the source and creates a new configuration according to the environment. `Env` and `Source` have priority. If priority is not defined, highest priority is added first.

### Config

    class Config {
	    constructor(sources: Source[], envs: string[], options?: Options);
	    sync(): Config;
	    get(key = ''): unknown | null;
    }
`config`  is a container for configuration.  `config`  is provided by creating a new configuration from the configuration and environment obtained from  `source`.

### Source

    interface Source {
	    export(): Map<string, Record<string, unknown>>;
    }
`Source` defines the source from which to get the configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

### Sources

    class  Sources  implements  Source {
	    constructor(sources: Source[], options?: Options);
		add(source: Source, priority = -1): Sources;
		export(): Map<string, Record<string, unknown>>;
	}
`Sources` defines the source by merging several sources. Use `add` to add source for new source. If priority is not defined, highest priority is added first. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.


### JsonSource

    export  default  class  JsonSource {
	    constructor();
		set(env: string, json: Record<string, unknown>): JsonSource;
		export(): Map<string, Record<string, unknown>>;
	}
`JsonSource` defines the source from JSON. Use `set` to add a configuration for a new environment. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

## Example

## Reference

 - [conev](https://github.com/CourseDesign/conev)
 - [deepmerge](https://github.com/TehShrike/deepmerge)
