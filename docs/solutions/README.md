# Решения

* [Добавить настраиваемый веб-шаблон из раздела "Шаблоны документов" на страницу](#добавить-настраиваемый-веб-шабnон-из-раздеnа-шабnоны-документов-на-страницу)
* [Запрос на получение списка всех настраиваемых полей](#запрос-на-поnучение-списка-всех-настраиваемых-поnей)
* [Отправить и создать клиентский файл на сервере](#отправить-и-создать-кnиентский-файn-на-сервере)
* [Скопировать репозиторий с GitHub](#скопировать-репозиторий-с-github)
* [Некорректная работа в старых браузерах IE](#некорректная-работа-в-старых-браузерах-ie)
* [Отправка Email на произвольный адрес](#отправка-email-на-произвоnьный-адрес)
 

## Добавить настраиваемый веб-шаблон из раздела "Шаблоны документов" на страницу.

```html
<link rel="stylesheet" type="text/css" href="custom_web_template.html?object_id=<%=ArrayFirstElem(XQuery("for $elem in custom_web_templates where $elem/code=5796971352983414117 return $elem")).id%>
``` 

## Запрос на получение списка всех настраиваемых полей.

Если у вас SQL база, то данный объект хранится в таблице \[\(spxml\_blobs\)\].

Для получения списка полей сделайте запрос в SQL Server Managment Studio:

```sql
SELECT *, CONVERT(xml,(data )) as xml_data 
FROM [(spxml_blobs)]
WHERE url like '%custom_templates%'
```

## Отправить и создать клиентский файл на сервере.

Создайте в корне вашего сайта файл \_save-file.html с наполнением ниже и откройте его

\(данный код будет сохранять файл любого формата в корне сайта\)

\(код тестовый, для общего понимания процесса, для использования на живой системе, надо продумать о безопасность\)

```js
<%
if(Request.UrlParam === 'save') {
var body = tools.read_object(Request.Body, 'json')
PutFileData(UrlToFilePath('x-local://wt/web/_' + body.name), Base64Decode(body.data))

var newDoc = tools.new_doc_by_name('resource')
root = newDoc.resource
root.name = body.name
root.file_name = body.name
root.file_url = 'x-local://wt/web/_' + body.name
newDoc.BindToDb(DefaultDb)
newDoc.Save()
}
%>
<input type="file">
<button onclick="save()">Save</button>
<script>
function save() {
    var file = document.querySelector('input').files[0]
    if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
            var data = e.target.result.replace('data:' + file.type + ';base64,', '')
            xhr({
                "name": file.name,
                "data": data
            })
        }
    }
}

function xhr(body) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", "/_save-file.html?save")
    xhr.send(JSON.stringify(body))
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Saved")
        }
    }
}
</script>
```

## Скопировать репозиторий с GitHub

```js
<%
ObtainDirectory(UrlToFilePath('x-local://wt/web/repo')) 
PutFileData(UrlToFilePath('x-local://wt/web/repo/new-repo-master.zip'), HttpRequest('https://github.com/maksimyurkov/new-repo/archive/master.zip').Body) 
ZipExtract(UrlToFilePath('x-local://wt/web/repo/new-repo-master.zip'), 'x-local://wt/web/repo') 
MoveFile(UrlToFilePath('x-local://wt/web/repo/new-repo-master'),UrlToFilePath('x-local://wt/web/repo')) DeleteFile(UrlToFilePath('x-local://wt/web/repo/new-repo-master.zip'))
%>
```

## Некорректная работа в старых браузерах IE

Добавьте тег `<meta http-equiv="X-UA-Compatible" content="IE=Edge">` в самое начало документа.

Режим Edge сообщает обозревателю Internet Explorer, чтобы отображать содержимое в самом высоком доступном режиме. В Internet Explorer 9 это эквивалентно режиму IE9. Если будущий выпуск Internet Explorer поддерживает более высокий режим совместимости, страницы, установленные в режиме edge, будут отображаться в самом высоком режиме, поддерживаемом этой версией. Те же самые страницы будут отображаться в режиме IE9 при просмотре с помощью Internet Explorer 9. Internet Explorer поддерживает ряд режимов совместимости документов, которые позволяют использовать разные функции и могут влиять на отображение содержимого. Подробнее по [ссылке](http://qaru.site/questions/10755/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do).

## Отправка Email на произвольный адрес

```js
<%
function _email(options) {
    try {
        var new_doc = tools.new_doc_by_name('active_notification')
        var doc_topElem = new_doc.TopElem
        doc_topElem.recipients.AddChild("recipient")
        doc_topElem.recipients[0].address = options.email
        doc_topElem.send_date = Date()
        doc_topElem.is_custom = 1
        doc_topElem.status = 'active'
        doc_topElem.body_type = 'html'
        doc_topElem.subject = options.subject
        doc_topElem.body = options.body
        new_doc.BindToDb(DefaultDb)
        new_doc.Save()
        return {}
    }
    catch (err) {
        throw new Error('_email: ' + err.message)
    }
}
%>
```



