export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        MONGO_URL:string;
        PASS_SEC:string;
        JWT_SEC:string
    }
  }
}