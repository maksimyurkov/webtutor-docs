# SQL

### SQL запросы в XQuery

Если база данных WebTutor находится на сервере MS SQL или Oracle, то запросы в XQuery можно писать на SQL. Запросы на SQL в Webtutor, работают быстрее чем запросы на XQuery, а также открывают множество возможностей, которые недоступны при использовании XQuery.

**Пример:**

```js
// Запрос на XQuery  
arr = XQuery('for $elem in courses where $elem/id=6237456404705184772 return $elem');

// Запрос на SQL  
arr = XQuery('sql:SELECT * FROM courses WHERE id=6237456404705184772');
```

```sql
// Больше SQL
arr = XQuery("sql:SELECT second.subdivision_id FROM subdivision_group_subdivisions main JOIN subdivision_group_subdivisions second ON main.code = second.code WHERE (main.code='0012934' AND second.is_dynamic=0)");

arr = XQuery("
SELECT
c.id AS id,
cs.fullname AS fullname,
c.data.value('collaborator/custom_elems/custom_elem[name="GK_hire_date"][1]/value', 'varchar(512)') AS GK_hire_date,
c.data.value('collaborator/org_name', 'varchar(512)') AS org_name,
c.data.value('collaborator/is_dismiss', 'bit') AS is_dismiss

FROM collaborator AS c 
INNER JOIN collaborators AS cs ON c.id = cs.id 
INNER JOIN positions AS ps ON cs.position_id = ps.id
");
```

### SQL функции в XQuery запросах

В XQuery вы можете использовать некоторые SQL функции. \(нет информации по доступным функциям...\)

**Example:**

```js
// Используем SQL функцию DATEADD() в SQL XQuery
arr = XQuery('sql:for $elem in collaborators where $elem/modification_date > DATEADD(day, -5, GETDATE())  return $elem');
```