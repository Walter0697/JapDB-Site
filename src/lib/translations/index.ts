import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  translations: {
    en: { lang },
    cs: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'home',
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'zh',
      key: 'home',
      loader: async () => (await import('./zh/home.json')).default,
    },
    {
      locale: 'en',
      key: 'sidemenu',
      loader: async () => (await import('./en/sidemenu.json')).default,
    },
    {
      locale: 'zh',
      key: 'sidemenu',
      loader: async () => (await import('./zh/sidemenu.json')).default,
    }
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));