import { registerAs } from '@nestjs/config';
import { Config } from './config.enum';
import * as process from 'node:process';

export interface IAppConfig {
  env: string;
  appHost: string;
  appPort: number;
  appDomain: string;
}

export interface IAuthConfig {
  accessSecret: string;
  accessPeriod: number;
  refreshSecret: string;
  refreshPeriod: number;
}

export interface IDatabaseConfig {
  databaseUrl: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export const AppConfig = registerAs(Config.AppConfig, (): IAppConfig => {
  const config: IAppConfig = {
    env: process.env.ENV!,
    appHost: process.env.APP_HOST!,
    appPort: Number(process.env.APP_PORT),
    appDomain: process.env.APP_DOMAIN!,
  };

  if (
    Object.values(config).filter(
      (item) => item === undefined || Number.isNaN(item),
    ).length
  ) {
    throw new Error('[AppConfig]: Invalid configuration');
  }

  return config;
});

export const AuthConfig = registerAs(Config.AuthConfig, (): IAuthConfig => {
  const config: IAuthConfig = {
    accessPeriod: Number(process.env.ACCESS_TOKEN_VALIDITY_PERIOD),
    refreshPeriod: Number(process.env.REFRESH_TOKEN_VALIDITY_PERIOD),
    accessSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
  };

  if (
    Object.values(config).filter(
      (item) => item === undefined || Number.isNaN(item),
    ).length
  ) {
    throw new Error('[AuthConfig]: Invalid configuration');
  }

  return config;
});

export const DatabaseConfig = registerAs(
  Config.DatabaseConfig,
  (): IDatabaseConfig => {
    const config: IDatabaseConfig = {
      databaseUrl: process.env.DATABASE_URL!,
    };

    if (Object.values(config).includes(undefined)) {
      throw new Error('[DatabaseConfig]: Invalid configuration');
    }

    return config;
  },
);

export const RedisConfig = registerAs(Config.RedisConfig, (): IRedisConfig => {
  const config: IRedisConfig = {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USER!,
    password: process.env.REDIS_USER_PASSWORD!,
  };

  if (
    Object.values(config).filter(
      (item) => item === undefined || Number.isNaN(item),
    ).length
  ) {
    throw new Error('[RedisConfig]: Invalid configuration');
  }

  return config;
});
