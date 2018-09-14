# Немного практики
 
В определенных случаях, для лучшего усвоения информации, надо попробовать что-то сделать самому и это как раз тот случай.

Напишем немного кода в котором есть серверная и клиентская часть, а также взаимодействие с базой данных.

Для этого понадобится работающий WebTutor. Если он у вас установлен, то все ок, если нет, то можете запросить демо-версию у службы поддержки WebSoft или сразу развернуть полноценную тестовую систему([инструкция](/test-system/)).

Создадим функционал, который позволяет получить текущую дату и случайного пользователя. Для этого в публичной директории WebTutor(`\WebSoft\WebTutorServer\wt\web`) создадим два файла:

1) **_server.html** - файл с серверным кодом WebTutor, который будет отвечать на приходящие POST запросы.

```js
<%
// Функция возвращает текущую дату и время в виде строки
function getDate() {
    // Воспользуемся встроенной в WebTutor функцией StrDate
    return StrDate(Date(), true, true)
}

// Функция возвращает данные случайного пользователя
function getRandomUser() {
    // Получаем из базы данных массив всех пользователей
    var users = XQuery("for $user in collaborators return $user")
    // Преобразуем массив пользователей в массив с прямым индексированием 
    // (для возможности использования далее users.length и users[index])
    users = ArrayDirect(users)
    // Общее количество пользователей
    var usersNumber = users.length
    // Получаем порядковый номер случайного пользователя
    var index = Random(0, (usersNumber - 1))
    // Берем данные случайного пользователя
    var userData = users[index]
    // Возвращаем строку с ФИО и ID пользователя
    return userData.fullname + " (ID:" + userData.id + ")"
}

///
/// Обрабатываем полученный POST запрос
///

// Преобразовываем тело полученного POST запроса из JSON формата в объект JavaScript
var body = tools.read_object(Request.Body, 'json')

// Получаем значение переменной parameter из POST запроса
var parameter = body.parameter

// Создаем переменную в которой будет храниться ответ сервера
var response = {data : ""};

// В зависимости от значения parameter устанавливаем значение переменной response
switch (parameter) {
    case "date":
        response.data = getDate()
    break
    case "random":
        response.data = getRandomUser()
    break
}

// Преобразовываем все в JSON формат
response = tools.object_to_text(response, 'json')

// Выводим сформированный ответ в JSON формате
%>

<%=response%>
```

2) **_client.html** - обычная .html страница на которой будет находиться интерфейс и с которой будут осуществляться POST запросы к _server.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Практика</title>
	<style>
		body {
			display: flex;
			flex-direction: column;
		}

		body > div {
			display: flex;
			margin-bottom: 16px;
		}

		body > div > div {
			padding-left: 16px;
			font-weight: 500;
		}
	</style>
</head>
<body>
	<div>
		<button onclick="getFromWebTutor('date')">Текущая дата</button>
		<div id="date"></div>
	</div>
	<div>
		<button onclick="getFromWebTutor('random')">Случайный пользователь</button>
		<div id="random"></div>
	</div>
</body>
<script>
    async function getFromWebTutor(parameter) {
        const response = await fetch('/_server.html', {
            method: "POST",
            body: JSON.stringify({
                parameter: parameter
            })
        })
        const json = await response.json()
        document.querySelector(`#${parameter}`).innerHTML = json.data
    }
</script>
</html>
```
После этого открываем файл **_client.html** в браузере и пользуемся.