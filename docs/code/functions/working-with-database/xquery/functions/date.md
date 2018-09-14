# date\(\)

Преобразует аргумент типа String в результат типа Date. Функция обычно используется в качестве константы \(литерала\), поскольку константы типа Date в XQuery отсутствуют.

**Аргументы:**

arg1 - must be in the format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS \(String\)

**Результат:**

Date

**Пример:**

```js
// Получить записи где поле last_usage_date > 2014-05-21
arr = XQuery("for $elem in learnings where $elem/last_usage_date>date('2014-05-21') return $elem");
```



