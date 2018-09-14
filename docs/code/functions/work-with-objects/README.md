# Работа с объектами

| Название | Описание | Тип |
| --- | --- | --- |
| [HasProperty\(\)](#hasproperty) | Проверяет существование атрибута. | Встроенная |

## HasProperty()

```js
/**
 * Проверяет существование атрибута. Выдает true, если атрубут с заданным наименованием существует, и false - если не существует.
 * @param {String} propName исходная строка
 * @return {Boolean}
 */
Object.HasProperty(propName);

// Пример
obj = {};
obj.prop_one = 'prop1';

obj.HasProperty("prop_one");
// true

obj.HasProperty("prop_two");
// false
```





