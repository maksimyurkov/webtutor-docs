# null\(\)

Возвращает значение null. Функция обычно используется в качестве константы \(литерала\), поскольку константы типа null в XQuery отсутствуют.

**Аргументы:**

нет аргументов

**Пример:**

```js
// Получить записи где phone = null
arr = XQuery("for $elem in collaborators where $elem/phone=null() return $elem");
```



