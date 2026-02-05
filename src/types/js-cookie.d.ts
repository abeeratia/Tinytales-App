declare module "js-cookie" {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [property: string]: any;
  }

  interface CookiesStatic {
    set(
      name: string,
      value: string,
      options?: CookieAttributes
    ): string | undefined;
    get(name: string): string | undefined;
    get(): { [key: string]: string };
    remove(name: string, options?: CookieAttributes): void;
    withAttributes(attributes: CookieAttributes): CookiesStatic;
    withConverter(converter: {
      read: (value: string, name: string) => string;
      write: (value: string, name: string) => string;
    }): CookiesStatic;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
