module.exports = {
  dest: "vuepress",
  title: "WebTutor Docs",
  description: "Неофициальное руководство по разработке в WebTutor",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/webtutor-logo.png`
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#1d9ee2" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: `https://res.cloudinary.com/cdn-01ht/image/upload/c_scale,w_152/v1531730403/logos/01ht/elements/logo.png`
      }
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href:
          "https://res.cloudinary.com/cdn-01ht/image/upload/c_scale,w_152/v1531730403/logos/01ht/elements/logo.svg",
        color: "#1d9ee2"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content:
          "https://res.cloudinary.com/cdn-01ht/image/upload/c_scale,w_144/v1531730403/logos/01ht/elements/logo.png"
      }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  serviceWorker: true,
  // theme: "vue",
  themeConfig: {
    repo: "maksimyurkov/webtutor-docs",
    editLinks: true,
    docsDir: "docs",
    // displayAllHeaders: true,
    sidebarDepth: 3,
    // algolia: {
    //   apiKey: "",
    //   indexName: ""
    // },
    nav: [{ text: "Руководство", link: "/about-webtutor/" }],
    editLinkText: "Редактировать страницу на GitHub",
    lastUpdated: "Последнее обновление",
    serviceWorker: {
      updatePopup: {
        message: "Доступен новый контент, обновите страницу",
        buttonText: "Обновить"
      }
    },
    sidebar: [
      {
        title: "Руководство",
        collapsable: false,
        children: [
          // О WebTutor
          "/about-webtutor/",
          // Составляющие WebTutor
          "/components-of-webtutor/",
          // Немного практики
          "/some-practice/",
          // Три вида разработки
          "/three-ways/",
          "/three-ways/internal/",
          "/three-ways/combined/",
          "/three-ways/external/",
          "/three-ways/conclusion/",
          // Варианты разработки
          "/development-options/",
          // Разработка с использованием веб-компонент
          "/development-options/web-components/",
          "/development-options/web-components/about-web-components/",
          "/development-options/web-components/webtutor-and-web-components/",
          "/development-options/web-components/check-encapsulation/",
          "/development-options/web-components/make-web-component-for-webtutor/",
          "/development-options/web-components/ready-web-components/",
          "/development-options/web-components/frameworks-for-web-components/",
          "/development-options/web-components/more-web-components/",
          "/development-options/web-components/conclusion/",
          // Тестовая система
          "/test-system/",
          "/test-system/installation-webtutor/",
          "/test-system/installation-iis/",
          "/test-system/installation-sql-server/",
          "/test-system/installation-ssms/",
          "/test-system/connecting-webtutor-to-iis/",
          "/test-system/connecting-webtutor-to-sql-server/",
          "/test-system/start-webtutor/",
          "/test-system/ftp-access/",
          "/test-system/connecting-webtutor-to-smtp/",
          "/test-system/internet-access/",
          "/test-system/filling-database/",
          "/test-system/even-more/",
          // Код
          "/code/",
          "/code/syntax/",
          "/code/global-variables/",
          "/code/embedded-objects/",
          "/code/functions/",
          "/code/functions/conversion-of-data-types/",
          "/code/functions/convert-formats-and-encodings/",
          "/code/functions/work-with-strings/",
          "/code/functions/work-with-dates/",
          "/code/functions/work-with-arrays/",
          "/code/functions/work-with-objects/",
          "/code/functions/working-with-regular-expressions/",
          "/code/functions/working-with-xml-documents/",
          "/code/functions/working-with-database/",
          "/code/functions/working-with-database/xquery/",
          "/code/functions/working-with-database/xquery/syntax/",
          "/code/functions/working-with-database/xquery/functions/",
          "/code/functions/working-with-database/xquery/sql/",
          "/code/functions/working-with-http-requests/",
          "/code/functions/working-with-the-file-system/",
          "/code/functions/code-execution/",
          "/code/functions/other-functions/",
          // Структура каталогов
          "/directory-structure/",
          // Webtutor Administrator
          "/webtutor-administrator/",
          // Отладка
          "/debugging/",
          // Советы
          "/advice/",
          // Решения
          "/solutions/",
          // Полезные ссылки
          "/useful-links/"
        ]
      }
    ]
  }
};