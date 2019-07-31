# ADODB

**ADOdb** — программная библиотека, обеспечивающая прикладной интерфейс доступа к базам данных.

## Создание подключения
Для того, чтобы работать с базой данных, нужно создать подключение. Для этого служит объект ADODB.Connection.
ADODB.Connection создается с помощью конструктора ActiveXObject:

```js
var ADODBConnection = new ActiveXObject("ADODB.Connection");
```
Подробнее об объекте ADODB.Connection можно почитать здесь: https://docs.microsoft.com/ru-ru/sql/ado/reference/ado-api/connection-object-ado?view=sql-server-2017

Теперь можно создать подключение к базе данных:

```js
var ODBCConnectionString = "Driver={SQL Server};Server=" + server_addr + ";Database=" + db_name + ";Trusted_Connection=Yes;";
ADODBConnection.Open(ODBCConnectionString);
```
server_addr - адрес SQL сервера, а db_name - имя базы данных. Здесь предполагается, что на сервере БД включена Windows-авторизация и учетная запись, из под которой открывается подключение, имеет доступ к базе данных.
Если на сервере не Windows авторизация или нужно подключиться не к SQL-серверу, нужно использовать другую строку: https://www.connectionstrings.com/

Подробнее о методе Open можно почитать здесь: https://docs.microsoft.com/ru-ru/sql/ado/reference/ado-api/open-method-ado-connection?view=sql-server-2017

## Выполнение запроса
После того, как создано подключение к базе данных, можно выполнить к ней запрос:

```js
var ODBCRecordset = ADODBConnection.Execute(query);
```
Метод Excecute возвращает набор записей (Recordset).
query - строка запроса.

Подробнее о методе Excecute можно почитать здесь: https://docs.microsoft.com/ru-ru/sql/ado/reference/ado-api/execute-method-ado-connection?view=sql-server-2017

## Recordset
Грубо говоря Recordset - это массив строк из БД. В нашем случае, отличие от массива заключается в том, что к запсям в Recordset нельзя обращаться по индексу. Для перебора записей в Recordset используется курсор. Для определения начала и конца Recordset используются параметры BOF и EOF.
Когда создается объект Recordset, курсор устанавливается в первую запись, а параметры BOF и EOF устанавливаются в False. Если записей нет, то BOF и EOF устанавливаются в True.
Для перебора записей, нужно сдигать курсор, пока EOF не станет равным True.

Подробнее об объекте Recordset можно почитать здесь: https://docs.microsoft.com/ru-ru/sql/ado/reference/ado-api/recordset-object-ado?view=sql-server-2017

## 
