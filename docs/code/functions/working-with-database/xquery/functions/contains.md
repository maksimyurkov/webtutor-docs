# contains\(\)

Проверяет, что строка содержит внутри себя другую строку. Регистр игнорируется.

Функцию следует использовать с осторожностью, поскольку ее выполнении не оптимизируется индексами на встроенной СУБД.

**Аргументы:**

arg1 - String

arg2 - подстрока \(String\)

**Result:**

Boolean

**Пример:**

```js
// Получить записи в которых поле position_name содержит в себе подстроку 'engineer'
arr = XQuery('for $elem in collaborators where contains($elem/position_name, 'engineer') return $elem');
```



