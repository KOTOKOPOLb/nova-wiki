import { defineConfig, HeadConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import lightbox from 'vitepress-plugin-lightbox'

function generateSidebarEntry(path: string, title: string) {
  return {
    documentRootPath: "src",
    scanStartPath: path,
    resolvePath: `/${path}/`,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    collapsed: true,
    rootGroupText: title,
    rootGroupLink: "/",
    sortMenusByFrontmatterOrder: true,
  };
}

const sidebar = generateSidebar(
  [
    { path: "wiki", title: "Вики" },
    { path: "characters", title: "Персонажи" }
  ].map((entry) => generateSidebarEntry(entry.path, entry.title))
);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ["link", { rel: "icon", href: "/assets/favicon.ico" }],
    ['meta', { property: 'og:locale', content: 'ru_RU' }],
    ['meta', { property: 'og:site_name', content: 'Nova' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'website' }],
    ['meta', { property: 'og:image', content: '/assets/logo-color.png' }]
  ],
  lang: "ru-RU",
  title: "Архив Nova",
  description: "Архив Империи Nova",
  srcDir: "src",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://wiki.novain.space",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    notFound: {
      code: "404",
      title: "Страница не найдена",
      quote: "Возможно, она была удалена, либо же переименована без перенаправления",
      linkText: "Вернуться на главную",
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Поиск",
            buttonAriaLabel: "Поиск страницы",
          },
          modal: {
            noResultsText: "Результатов не найдено по запросу",
            resetButtonTitle: "Очистить",
            footer: {
              selectText: "- выбрать",
              navigateText: "- переключение между результатами",
              closeText: "- закрыть",
            },
          },
        },
      },
    },
    sidebarMenuLabel: "Меню",
    darkModeSwitchLabel: "Режим",
    returnToTopLabel: "Наверх",
    docFooter: {
      prev: "Предыдущая страница",
      next: "Следующая страница",
    },
    lastUpdated: {
      text: 'Обновлено'
    },
    outline: {
      label: "Содержание",
      level: [2, 3],
    },
    logo: "/assets/logo-color.svg",
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Вики', link: '/wiki/', activeMatch: 'wiki/*' },
      { text: 'Персонажи', link: '/characters/', activeMatch: 'characters/*'}
    ],
    sidebar,
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/JM5A2vFxSZ' },
      { icon: 'telegram', link: 'https://t.me/NewsFromNova' },
      { icon: 'youtube', link: 'https://youtube.com/@Scientist_Ark' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(lightbox, {});
    },
  },
  transformHead: ({ pageData, site }) => {
    const head = [];
    const fm = pageData && pageData.frontmatter ? pageData.frontmatter : {};
    const title = fm.title || pageData?.title || site?.title || '';
    const description = fm.description || pageData?.description || site?.description || '';
    const pageUrl = pageData?.url ? new URL(pageData.url, site?.url || 'https://wiki.novain.space').toString() : (site?.url || '');
    const image = fm.image || site?.themeConfig?.socialImage || site?.image || '';

    if (title) {
      head.push(['meta', { property: 'og:title', content: String(title) }]);
    }

    if (description) {
      head.push(['meta', { property: 'og:description', content: String(description) }]);
      head.push(['meta', { name: 'description', content: String(description) }]);
    }

    if (pageUrl && pageUrl !== 'https://wiki.novain.space') {
      head.push(['meta', { property: 'og:url', content: String(pageUrl) }]);
      head.push(['link', { rel: 'canonical', href: String(pageUrl) }]);
    }

    if (image) {
      let imageUrl = String(image);
      try {
        if (site?.url && !/^https?:\/\//i.test(imageUrl)) {
          imageUrl = new URL(imageUrl.replace(/^\//, ''), site.url).toString();
        }
      } catch (err) {
      }
      head.push(['meta', { property: 'og:image', content: imageUrl }]);
    }
    return head;
  }
})
