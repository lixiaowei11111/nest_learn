export interface EnvConfig {
  port?: number;
  host?: string;
}

export interface ConfigOptions {
  folder: string;
}

export const CONFIG_OPTIONS = Symbol.for('CONFIG_OPTIONS');
