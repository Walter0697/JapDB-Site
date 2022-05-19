<script context="module">
	import { t, locale, locales, loadTranslations } from '@lib/translations';
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => {
	  const { pathname } = url;
	  const defaultLocale = 'en'; // get from cookie / user session etc...
	  const initLocale = locale.get() || defaultLocale; 
	  await loadTranslations(initLocale, pathname); // keep this just before the `return`
	  return {};
	}
</script>

<script lang="ts">
	import SideMenu from '@lib/SideMenu.svelte';
	import '../app.css';
</script>

<SideMenu>
	<slot />
</SideMenu>

<style>
</style>
