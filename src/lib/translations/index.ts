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
      key: 'quiz',
      loader: async () => (await import('./en/quiz.json')).default,
    },
    {
      locale: 'zh',
      key: 'quiz',
      loader: async () => (await import('./zh/quiz.json')).default,
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
    },
    {
      locale: 'en',
      key: 'generic',
      loader: async () => (await import ('./en/generic.json')).default,
    },
    {
      locale: 'zh',
      key: 'generic',
      loader: async () => (await import ('./zh/generic.json')).default,
    }
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));