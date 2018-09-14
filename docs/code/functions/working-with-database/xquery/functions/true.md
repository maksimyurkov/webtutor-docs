# true\(\)

Возвращает значение true. Функция обычно используется в качестве константы \(литерала\), поскольку константы типа Boolean в XQuery отсутствуют.

**Аргументы:**

нет аргументов

**Результат:**

Boolean

**Пример:**

```js
// Получить записи где is_dynamic = true
arr = XQuery("for $elem in groups where $elem/is_dynamic=true() return $elem");
```



