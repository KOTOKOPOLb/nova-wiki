// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'
import './home.css'
import './outline.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    const update = () => {
      const opened = !!document.querySelector('.medium-zoom-overlay, .medium-zoom--opened, .medium-zoom-image--opened');
      document.documentElement.classList.toggle('lb-zoom-open', opened);
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });
    if (import.meta.hot) import.meta.hot.dispose(() => mo.disconnect());
  }
} satisfies Theme
