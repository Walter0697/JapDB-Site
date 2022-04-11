<script lang="ts">
  import Drawer, {
    AppContent,
    Content,
    Header,
    Title,
    Subtitle,
  } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import IconButton from '@smui/icon-button';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import logo from './sprite/svelte-logo.svg';
  import { t, locale } from '@lib/translations';

  let open = false;

  function setActive(value: string) {
    open = false;
    goto(`/${value}`, { replaceState: true }) 
  }
</script>

<div class="drawer-container">
    <Drawer variant="dismissible" bind:open>
      <Header>
        <Title>JapDB</Title>
        <Subtitle>{$t('sidemenu.description')}</Subtitle>
      </Header>
      <Content>
        <List>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('home')}
            activated={$page.url.pathname === '/home'}
          >
            <Text>{$t('sidemenu.home')}</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('dictionary')}
            activated={$page.url.pathname === '/dictionary'}
          >
            <Text>{$t('sidemenu.dictionary')}</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('book')}
            activated={$page.url.pathname === '/book'}
          >
            <Text>{$t('sidemenu.quiz')}</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('grammar')}
            activated={$page.url.pathname === '/grammar'}
          >
            <Text>{$t('sidemenu.grammar')}</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => locale.get() === 'en' ? locale.set('zh') : locale.set('en')}
            activated={false}
          >
            <Text>{$t('sidemenu.lang')}</Text>
          </Item>
        </List>
      </Content>
    </Drawer>
  
    <AppContent class="app-content">
      <main class="main-content">
        <div>
          <IconButton on:click={() => (open = !open)}>
            <img src={logo} alt="SvelteKit" />
          </IconButton> 
        </div>
        <div>
          <slot />
        </div>
      </main>
    </AppContent>
</div>

<style>
    /* These classes are only needed because the
      drawer is in a container on the page. */
    .drawer-container {
      position: relative;
      display: flex;
      height: 100vh;
      border: 1px solid
        var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
      overflow: hidden;
      z-index: 0;
    }
  
    * :global(.app-content) {
      flex: auto;
      overflow: auto;
      position: relative;
      flex-grow: 1;
    }
  
    .main-content {
      overflow: auto;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
    }

    .testing {
      width: 50px;
      height: 50px;
      background-color: red;
    }
</style>
  