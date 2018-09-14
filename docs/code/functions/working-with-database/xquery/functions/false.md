# false\(\)

Возвращает значение false. Функция обычно используется в качестве константы \(литерала\), поскольку константы типа Boolean в XQuery отсутствуют.

**Аргументы:**

нет аргументов

**Результат:**

Boolean

**Пример:**

```js
// Получить записи где is_dynamic = false
arr = XQuery("for $elem in groups where $elem/is_dynamic=false() return $elem");
```



