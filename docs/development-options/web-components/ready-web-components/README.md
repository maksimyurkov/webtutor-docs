# Готовые веб-компоненты

В интернете, среди готовых веб-компонент, в основном пока встречаются только элементы интерфейса ([кнопки](https://www.webcomponents.org/search/button), [меню](https://www.webcomponents.org/search/menu), [текстовые поля](https://www.webcomponents.org/search/input), [диалоговые окна](https://www.webcomponents.org/search/dialog), [выбор даты](https://www.webcomponents.org/search/date-picker), [таблицы](https://www.webcomponents.org/search/grid) ...), но бывает уже попадаются более сложные веб-компоненты ([графики](https://vaadin.com/components/vaadin-charts/examples), [голосовые](https://www.webcomponents.org/element/zenorocha/voice-elements), [шаблоны для приложений](https://www.webcomponents.org/element/PolymerElements/app-layout) ...), веб-компоненты заточенные под различные API ([Google](https://www.webcomponents.org/element/GoogleWebComponents/google-apis), [Firebase](https://www.webcomponents.org/element/firebase/polymerfire), [Twitch](https://www.webcomponents.org/element/klarkc/streaming-list) ...).

Вот некоторые места, где вы можете найти веб-компоненты:

[webcomponents.org](https://www.webcomponents.org/)

[Vaadin](https://vaadin.com)

[Material Web Components](https://github.com/material-components/material-components-web-components)

[Predix Design System](https://www.predix-ui.com)

[expand.js](https://expandjs.com)

[Wired Elements](https://wiredjs.com)

[Bosonic](https://bosonic.github.io)

На самом деле разнообразных веб-компонент на порядок больше, просто они находятся в закрытых репозиториях. Многие компании уже несколько лет используют веб-компоненты.

Вот несколько видео с саммитов, можете посмотреть, как они их делают, используют и какие задачи они у себя решают с помощью веб-компонент:

[YouTube](https://www.youtube.com/watch?v=tNulrEbTQf8)

[Electronic Arts](https://www.youtube.com/watch?v=FJ2KEvzlyo4)

[Net-a-Porter](https://www.youtube.com/watch?v=DwrLEd0gBcA)

Даже существующее небольшое количество веб-компонент существенно облегчают разработку. Уже сейчас есть большинство существующих элементов интерфейса в формате веб-компонент. Многие веб-компоненты сделаны очень качественно, имеют множество настроек, оптимизированы, документированы, постоянно обновляются и главное бесплатны (но не все). На создание подобных веб-компонент на том же уровне, у вас бы ушли месяцы, но не уйдут, вы просто устанавливаете их и используете, не забивая себе ничем голову. Вот некоторые примеры веб-компонент, которые сделаны в лучших традициях, надо стремиться делать что-то подобное. ([Polymer Elements](https://www.webcomponents.org/search/polymerElements), [Vaadin Elements](https://vaadin.com/elements/browse))

Вы наверно уже приметили, что во многих веб-компонентах фигурирует название Polymer. Что еще за Polymer? [Polymer](https://polymer-project.org) - это библиотека для создания веб-компонент и одновременно фреймворк для создания приложений. Суть в том, что веб-компоненты можно писать используя только спецификацию и полифиллы для поддержки всех браузеров (как это было при написании [employees-sample](https://github.com/maksimyurkov/employees-sample), [h1-sample](https://github.com/maksimyurkov/h1-sample) в предыдущих разделах), а можно еще при разработке использовать свои инструменты, какую-нибудь библиотеку или фреймворк (Polymer, Vue.js, React ...).

Веб-компонента сделанная с использованием только спецификации и полифиллов будет работать везде.

Веб-компонента сделанная с помощью сторонней библиотеки будет работать не везде. Работа веб-компоненты будет зависеть от возможностей используемой библиотеки и ваших потребностей.

Используя библиотеку Polymer написано довольно много веб-компонент. Чтобы использовать эти готовые веб-компоненты вам придется вместе с ними добавлять и библиотеку Polymer на страницу, но как будет рассмотрено в следующем разделе, это далеко не самый оптимальный вариант для систем. И Polymer и сделанные с помощью него веб-компоненты в большинстве случаев использовать в WebTutor и других системах не получится.(касается Polymer ver.1-2, в Polymer ver.3 таких проблем нет)

Рассмотрим, что надо учитывать при выборе вспомогательной для разработки веб-компонент библиотеки, чтобы ваши веб-компоненты работали  во всех системах.

