import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

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
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  lang: "ru-RU",
  title: "Архив Nova",
  description: "Архив Империи Nova",
  srcDir: "src",
  cleanUrls: true,
  lastUpdated: false,
  appearance: "force-dark",
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
    outline: {
      label: "Содержание",
      level: [2, 3],
    },
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
  }
})
