# doc-contains\(\)

Функция полнотекстового поиска в базе.

**Аргументы:**

arg1 - ID объекта \($elem/id\)  
arg2 - имя базы данных  
arg3 - строка поиска \(String\)  
arg4 - имя таблицы \(в старой объектной модели не используется\)

**Результат:**

Boolean

**Пример:**

```js
// Получить записи где настраиваемое поле specialcell = true
arr = XQuery("for $elem in collaborators where doc-contains($elem/id,'wt_data','[specialcell = true]','collaborators') return $elem");
```



