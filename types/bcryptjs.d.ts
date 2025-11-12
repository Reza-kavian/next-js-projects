declare module 'bcryptjs' {
  export function hash(password: string, salt: number): Promise<string>;
  export function hashSync(password: string, salt: number): string;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
}