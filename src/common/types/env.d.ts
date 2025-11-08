declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    DB_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    JWT_SECRET: string;
    EMAIL_SECRET: string;
    PHONE_SECRET: string;
  }
}
