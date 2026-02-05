import { getRequestConfig } from "next-intl/server";
import { locales } from "../navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // هنا بنضمن إن لو الـ locale مش موجود أو undefined نستخدم 'en'
  const activeLocale =
    locale && locales.includes(locale as any) ? locale : "en";

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default,
  };
});
