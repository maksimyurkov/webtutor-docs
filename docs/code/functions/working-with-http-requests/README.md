# Работа с HTTP запросами

| Название | Описание | Тип |
| --- | --- | --- |
| [Request](#request) | Встроенный объект Request доступен на сервере xHttp.exe при вызове кода веб-страницы. Обозначает соответствующий HTTP-запрос к странице. | Встроенный объект |
| [HttpRequest()](#httprequest) | Выполняет HTTP-запрос | Встроенная |


## Request

Встроенный объект Request доступен на сервере xHttp.exe при вызове кода веб-страницы. Обозначает соответствующий HTTP-запрос к странице.

Информацию по всем доступным атрибутам и методам объекта Request вы можете получить по [ссылке](http://docs.datex.ru/article.htm?id=5665465792879477229).

```js
// Добавить заголовок в ответ сервера
Request.AddRespHeader("Access-Control-Allow-Origin","*");
```

```js
// Получить параметры переданные методом GET
// http://webtutor.otpbank.ru/view_doc.html?mode=home&code=345345&position=boss
Request.QueryString.GetOptProperty("mode", "");
// 'home'

Request.QueryString.GetOptProperty("code", "");
// '345345'

Request.QueryString.GetOptProperty("position", "");
// 'boss'

// Указать значение по умолчанию если параметр отсутствуюет
Request.QueryString.GetOptProperty("fail", 123);
```

```js
// Получить свойство объекта переданного методом POST
Request.Form.GetOptProperty("position", "");
```

```js
// Получить TopElem пользователя сделавшего запрос
Request.Session.Env.GetOptProperty('curUser', null);
```

## HttpRequest()

```js
 * Выполняет HTTP-запрос
 * @param {String} URL название параметра
 * @param {String} method 'get' или 'post'. Необязательный аргумент. По умолчанию 'get'
 * @param {String} body тело запроса. Необязательный аргумент.
 * @param {String} fields список дополнительных полей заголовка http-запроса в соответствующем формате(имя:значение перевод строки) (String). Необязательный аргумент. Список также может содержать дополнительные опции.
 * @return {Object} HttpResponse
 */

// Пример
HttpRequest('http://reg.datex-soft.com/');
HttpRequest('http://reg.datex-soft.com/login.htm', 'post', UrlEncodeQuery( {login:'xxx',password:'xxx'}));
```

Среди списка дополнительных полей заголовка возможно использование следующих опций, которые обрабатываются отдельно и не попадают в передаваемый заголовок:

**Ignore-Errors**- Игнорировать наличие кода ошибки HTTP в ответе. Если указана эта опция, код ошибки можно получить через атрибут [RespCode](http://docs.datex.ru///article.htm?id=5620276905286592664) возвращаемого объекта. По умолчанию функция завершается с ошибкой в случае получения кода ошибки по HTTP.

```js
HttpRequest('http://reg.datex-soft.com/login.htm', 'post', '<xxx>111</xxx>', 'Content-type: text/xml\nIgnore-Errors: 1\n');
```

**Auto-Redirect**- Автоматически следовать редиректам HTTP 303, HTTP 304. По умолчанию true.

### HttpResponse

Объект HttpResponse - это объект, который возвращает функция HttpRequest. То есть вызов функции HttpRequest - единственный способ создать объект HttpResponse, в явном виде его создать нельзя. Основной атрибут этого объекта - Body, все остальные используются в редких случаях.

### Атрибуты объекта

**Body** \(String\) - тело Http - ответа, возвращаемое в виде строки, возможно бинарной.

**ContentType** \(String\) - содержит поле Content-Type, которое пришло в заголовке Http - ответа.

**Header** \(Object\) - Возвращает содержимое заголовка HTTP-ответа в виде стандартного объекта JScript, содержащего &lt;пары имя поля&gt; - &lt;значение поля&gt;.

**RespCode** \(Integer\) -  Код ошибки, который вернул Http-запрос. Обычно, если никакой ошибки нет, это код 200. Если произошла ошибка, то соответствующий код ошибки будет сохранен в этом атрибуте. В обычных ситуациях этот код ошибки не возвращается, так как если произошла ошибка, метод срабатывает исключением. Имеет смысл использовать атрибут RespCode, только если метод HttpRequest задан с параметром Ignore-Error.

**BinaryBody** \(Binary Object\) - тело Http-ответа, возвращаемое в виде объекта типа Binary. Редко используется с тех пор, как строки стали поддерживать бинарные данные, теперь разница между Body и BinaryBody фактически не стало.

```js
// Получить архив .zip по url и разместить его на сервере.
PutFileData(UrlToFilePath('x-local://wt/web/storage.zip'), HttpRequest('http://localhost:8870/storage.zip').Body);
```

### Методы объекта

SaveToFile\(\) - Сохраняет результат Http-запроса напрямую в файл, помогает экономить оперативную память.




