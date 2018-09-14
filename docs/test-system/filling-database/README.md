# Наполнение базы данных

Если вы подключаете к тестовой системе свою(наполненную) базу данных, то можете пропустить данный раздел.

Хорошо если у вас есть возможность подключить к тестовой системе реально существующую, наполненную базу данных, но как быть если ее нет.

При установке WebTutor предоставляется возможность установить демонстрационные данные, но их там довольно мало и чтобы не вводить в дальнейшем путаницу мы при установке их не добавляли.

Можно вручную создавать карточки в WebTutor Administrator, но это очень долго и не так просто на лету что-то  придумывать и заполнять поля.

В данном разделе будет пара примеров, как можно наполнять базу данных. Наполним базу пользователями и курсами.

Потребуется [Node.js](https://nodejs.org/en/), установите, если его у вас нет.

## Создание сотрудников

Придумывать и создавать сотрудников самому вручную дело "такое". В интернете есть различные сервисы, которые генерируют данные пользователей в любых количествах. Мы будем использовать сервис [http://randomuser.ru](http://randomuser.ru).

Этапы создания:

1) Генерируем json c данными 1000 пользователей. Проходим по ссылке [http://randomuser.ru/api.json?results=1000](http://randomuser.ru/api.json?results=1000) (цифра в конце ссылки означает количество пользователей, выбирайте на свое усмотрение) и сохраняем содержимое страницы в файл `C:\filler\users\users.json`.

2) Создайте файл `C:\filler\users\get-avatars.js`  с таким содержимым:

```js
'use strict'
const request = require('request')
const fs = require('fs')
fs.readFile('users.json', (err, userData) => {
    console.log('Start')
    if (!fs.existsSync('avatars')) fs.mkdir('avatars')
    let data = JSON.parse(userData)
    let requestsArr = []
    let large, medium, thumbnail
    for (let i of data) {
        if (i.user.gender == "male") {
            large = i.user.picture.large.replace("http://randomuser.ru/images/men/", "")
            large = large.replace(".jpg", "-large-m.jpg")

            medium = i.user.picture.medium.replace("http://randomuser.ru/images/men/med/", "")
            medium = medium.replace(".jpg", "-medium-m.jpg")

            thumbnail = i.user.picture.thumbnail.replace("http://randomuser.ru/images/men/thumb/", "")
            thumbnail = thumbnail.replace(".jpg", "-thumbnail-m.jpg")
        } else {
            large = i.user.picture.large.replace("http://randomuser.ru/images/women/", "")
            large = large.replace(".jpg", "-large-w.jpg")

            medium = i.user.picture.medium.replace("http://randomuser.ru/images/women/med/", "")
            medium = medium.replace(".jpg", "-medium-w.jpg")

            thumbnail = i.user.picture.thumbnail.replace("http://randomuser.ru/images/women/thumb/", "")
            thumbnail = thumbnail.replace(".jpg", "-thumbnail-w.jpg")
        }

        requestsArr.push({
            "url": i.user.picture.large,
            "filename": large
        })
        requestsArr.push({
            "url": i.user.picture.medium,
            "filename": medium
        })
        requestsArr.push({
            "url": i.user.picture.thumbnail,
            "filename": thumbnail
        })
    }
    var j = 0
    var interval = setInterval(_ => {
        if (requestsArr[j] !== undefined) {
            j++
            request(requestsArr[j].url, {
                encoding: 'binary'
            }, (error, response, body) => {
                fs.writeFile('avatars/' + requestsArr[j].filename, body, 'binary', _ => {})
                console.log(+(j / (requestsArr.length / 100)).toFixed(2) + '%')
            })
        } else {
            clearInterval(interval)
            console.log('100% Complete')
        }
    }, 3000)
})
```

3) В командной строке вводим команды и ждем завершения скачивания изображений (пока не будет написано 100% Complete), займет это ~ 2.5 часа, всего будет 510 изображений:

`cd C:\filler\users` + Enter 
`npm install fs` + Enter 
`npm install request` + Enter 
`node get-avatars.js` + Enter

4) Копируем файл `C:\filler\users\users.json` и папку `C:\filler\users\avatars` в `C:\Program Files\WebSoft\WebTutorServer\wt\web`

5) В WebTutor Administrator в `Дизайнер` - `Агенты Сервера` запускаем такой код.

```js
var usersObj = tools.read_object(LoadFileData(UrlToFilePath("x-local://wt/web/users.json")), "json")
for (var i = 0; i < usersObj.length; i++) {
    doc = tools.new_doc_by_name('collaborator')
    doc_Top = doc.collaborator
    if (usersObj[i].user.gender === "female") {
        doc_Top.sex = "w"
    } else {
        doc_Top.sex = "m"
    }
    doc_Top.lastname = usersObj[i].user.name.last
    doc_Top.firstname = usersObj[i].user.name.first
    doc_Top.middlename = usersObj[i].user.name.middle
    doc_Top.address = usersObj[i].user.location.zip + ", " + usersObj[i].user.location.state + ", " + usersObj[i].user.location.city + ", " + usersObj[i].user.location.street + " " + usersObj[i].user.location.building
    doc_Top.login = usersObj[i].user.username
    doc_Top.personal_config.nick = usersObj[i].user.username
    doc_Top.email = usersObj[i].user.email
    doc_Top.system_email = "company."+usersObj[i].user.email
    doc_Top.password = usersObj[i].user.password
    doc_Top.hire_date = "" + String(RawSecondsToDate(usersObj[i].user.registered))
    doc_Top.position_date = "" + String(RawSecondsToDate(usersObj[i].user.registered))
    doc_Top.birth_date = "" + String(RawSecondsToDate(usersObj[i].user.dob))
    doc_Top.phone = usersObj[i].user.phone
    doc_Top.mobile_phone = usersObj[i].user.cell
    if(usersObj[i].user.gender === "male") {
        doc_Top.pict_url = "/avatars/"+StrReplace(usersObj[i].user.picture.medium, "http://randomuser.ru/images/men/med/", "")
        doc_Top.pict_url = StrReplace(doc_Top.pict_url, ".jpg", "-medium-m.jpg")
        doc_Top.personal_config.avatar_filename = StrReplace(usersObj[i].user.picture.medium, "http://randomuser.ru/images/men/med/", "")
        doc_Top.personal_config.avatar_filename = StrReplace(doc_Top.personal_config.avatar_filename, ".jpg", "-medium-m.jpg")
    }
    else {
        doc_Top.pict_url = "/avatars/"+StrReplace(usersObj[i].user.picture.medium, "http://randomuser.ru/images/women/med/", "")
        doc_Top.pict_url = StrReplace(doc_Top.pict_url, ".jpg", "-medium-w.jpg")
        doc_Top.personal_config.avatar_filename = StrReplace(usersObj[i].user.picture.medium, "http://randomuser.ru/images/women/med/", "")
        doc_Top.personal_config.avatar_filename = StrReplace(doc_Top.personal_config.avatar_filename, ".jpg", "-medium-w.jpg")
    }
    doc.BindToDb(DefaultDb)
    doc.Save()
}
```

6) Удаляем файл `C:\filler\users\users.json`

7) Готово

## Создание курсов

С курсами почти тоже самое, что и с сотрудниками. Берем первый попавшийся сайт с каталогом курсов и у которого есть API и переносим его в WebTutor. Воспользуемся API [Udacity](https://www.udacity.com).

1) Проходим по ссылке [https://www.udacity.com/public-api/v0/courses](https://www.udacity.com/public-api/v0/courses) и сохраняем содержимое страницы в файл `C:\filler\courses\courses.json`

2) Создайте файл `C:\filler\courses\get-miniatures.js` с таким содержимым:

```js
   'use strict'
   const request = require('request')
   const fs = require('fs')
   fs.readFile('courses.json', (err, coursesData) => {
       console.log('Start')
       if (!fs.existsSync('miniatures')) fs.mkdir('miniatures')
       let data = JSON.parse(coursesData).courses
       let requestsArr = []
       let large, medium, thumbnail
       for (let i of data) {
           if (i.image !== '') {
               requestsArr.push({
                   "url": i.image,
                   "filename": i.key
               })
           }
       }
       var j = 0
       var interval = setInterval(_ => {
           if (requestsArr[j] !== undefined) {
               j++
               request(requestsArr[j].url, {
                   encoding: 'binary'
               }, (error, response, body) => {
                   fs.writeFile('miniatures/' + requestsArr[j].filename + '.jpg', body, 'binary', _ => {})
                   console.log(+(j / (requestsArr.length / 100)).toFixed(2) + '%')
               })
           } else {
               clearInterval(interval)
               console.log('100% Complete')
           }
       }, 3000)
   })
```

3) В командной строке вводим команды и ждем завершения скачивания изображений (пока не будет написано 100% Complete), займет это ~ 10 минут:

cd C:\filler\users + Enter  
npm install fs + Enter  
npm install request + Enter  
node get-miniatures.js + Enter

4) Копируем файл:

`C:\filler\users\courses.json` в `C:\Program Files\WebSoft\WebTutorServer\wt\web`

папку `C:\filler\courses\miniatures` в `C:\Program Files\WebSoft\WebTutorServer\wt\web\assets\courses`

5) В WebTutor Administrator в `Дизайнер` - `Агенты сервера` запускаем такой код.

```js
var coursesObj = tools.read_object(LoadFileData(UrlToFilePath("x-local://wt/web/courses.json")), "json").courses
ObtainDirectory('x-local://wt/web/webtutor/udacity-courses', true)
for (var i = 0; i < coursesObj.length; i++) {
    if(coursesObj[i].image !== '') {
    doc = tools.new_doc_by_name('course')
    doc_Top = doc.course
    doc_Top.code = coursesObj[i].key
    doc_Top.name = coursesObj[i].title
    doc_Top.desc = coursesObj[i].summary
    doc_Top.status = "publish"
    doc_Top.disp_scrolling = true
    doc_Top.resizable = false
    doc_Top.parts.AddChild()
    doc_Top.parts[0].code = doc_Top.code
    doc_Top.parts[0].name = "Модуль - "+doc_Top.name
    doc_Top.parts[0].type = "lesson"
    doc_Top.parts[0].url = "webtutor/udacity-courses/"+doc_Top.code+".html"
    course_redirect = "<script>window.location = '"+coursesObj[i].homepage+"'</script>"
    PutFileData(UrlToFilePath('x-local://wt/web/webtutor/udacity-courses/'+doc_Top.code+'.html'), course_redirect)
    doc_Top.parts[0].disp_scrolling = true
    doc_Top.parts[0].resizable = true
    doc_Top.parts[0].is_mandatory = true
    doc_Top.parts[0].is_visible = true
    doc_Top.parts[0].set_status_side = "course"
    doc_Top.parts[0].score_factor = 1
    doc_Top.parts[0].attempts_num = 1
    doc_Top.mastery_score = 80
    doc_Top.max_score = 100
    doc_Top.score_sum_type = "score"
    doc_Top.score_sum_eval = "score"
    doc_Top.yourself_start = true
    doc_Top.finish_without_mastery_score = true
    doc_Top.auto_finish = true
    doc_Top.ignor_location = false
    doc_Top.start_after_finish = false
    doc_Top.duration = 14
    doc.BindToDb(DefaultDb)
    doc.Save()
    }
}
```

6) Удаляем файл `C:\filler\users\courses.json`

7) Готово

---

Подобным образом можно заполнять и другие разделы, но в идеале конечно лучше поискать реальную наполненную базу данных.

