# Работа со строками

| Название | Описание | Тип |
| --- | --- | --- |
| [StrReplace()](#strreplace) | Заменяет все вхождения одной подстроки на другую в заданной строке. | Встроенная |
| [StrContains()](#strcontains) | Проверяет, содержит ли строка другую строку в качестве подстроки. | Встроенная |

## StrReplace()

```js
/**
 * Заменяет все вхождения одной подстроки на другую в заданной строке, если такие имеются. Возвращает измененную строку.
 * @param {String} str исходная строка
 * @param {String} subStr исходная подстрока
 * @param {String} newSubStr новая подстрока
 * @return {String}
 */
function StrReplace(str, subStr, newSubStr) {...}

// Пример
str = 'Строка';
str_replacement = 'кa';
str_which_replaced = 'йка'
StrReplace(str, str_replacement, str_which_replaced);
// 'Стройка'
```

## StrContains()

```js
/**
 * Проверяет, содержит ли строка другую строку в качестве подстроки.
 * @param {String}  str строка, в которой ищут
 * @param {String}  subStr подстрока, которую ищут
 * @param {Boolean} ignoreCase не учитывать регистр. Не обязательный аргумент.
 * @return {Boolean}
 */
function StrContains(str, subStr, ignoreCase) {...}

// Пример
StrReplace('Бегемот', 'бег', true);
// true
```




