# Работа с документами XML

## Создание объекта

```js
// Создаем новый XML документ по указанному шаблону
var new_doc = tools.new_doc_by_name('collaborator');
// Другой способ: var new_doc = OpenNewDoc('x-local://wtv/wtv_collaborator.xmd');

// Заполняем документ
new_doc.collaborator.lastname='Иванов';
new_doc.collaborator.firstname='Иван';
new_doc.collaborator.middlename='Иванович';

// Преобразуем документ в объект и назначаем уникальный ID и URL
new_doc.BindToDb(DefaultDb);

// Сохраняем документ
new_doc.Save();
```

## Манипуляции с объектом

```js
// Получить URL объекта с id=5293675553778464355
doc_url = UrlFromDocID(5293675553778464355);
// doc_url = "x-local://wt_data/objects/4976E9DE7B2276/63.xml"

// Открыть объект(XML-документ) используя его URL
open_doc = OpenDoc(doc_url);
// open_doc = объект типа XmlDoc (подробнее=> http://docs.datex.ru/article.htm?id=5620203358492510980)

// Получить URL до XMD, на основе которого сформирован объект 
xmd_doc = open_doc.FormUrl;
// xmd_doc = "x-local://wtv/wtv_collaborator.xmd"

// Получить ID объекта
doc_id = open_doc.DocID;
// doc_id = 5293675553778464355;

// Получить корневой елемент объекта
doc_TopElem = open_doc.TopElem;
// Для работы с корнем объекта вы также можете использовать полную запись => new_doc.collaborator.lastname='Иванов';
// Рекомендуется использовать универсальный способ => new_doc.TopElem.lastname='Иванов'

// Получить название корневого элемента объекта
doc_rootName = open_doc.TopElem.Name;
// doc_rootName = 'collaborator';

// Получить атрибут объекта 'position_name'
position = open_doc.TopElem.position_name;
// position = 'Руководитель отдела';

// Получить текущий объект в XML формате (также будут включены дочерние элементы)
xml_position = open_doc.TopElem.position_name.Xml;
// xml_position = '<position_name>Руководитель отдела</position_name>';

// Изменить атрибут 'position_name'
open_doc.TopElem.position_name = 'Руководитель подразделения';

// Очистить значение атрибута 'birth_date' 
open_doc.TopElem.birth_date.Clear();

// Получить значение настраиваемого поля
custom_value = open_doc.TopElem.custom_elems.ObtainChildByKey("value").value;

// Найти соответствующий множественный элемент с заданным значением
// К примеру если в элементе несколько элементов с одинаковым названием:
// <category_id>admin</category_id>
// <category_id>boss</category_id>
open_doc.TopElem.category_id.ObtainByValue("boss"); 
// Если не находит, добавляет новый элемент и присваивает ему заданное значение

// Если атрибут объект является массивом, то для добавления в него нового элемента надо использовать метод AddChild()
// Добавим функционального руководителя
func_manager = open_doc.TopElem.func_managers.AddChild();
func_manager.person_id = 5293675553778464394;
func_manager.person_fullname = 'Пахомов Вячеслав Андреевич';
func_manager.boss_type_id = 2691248884100914019;

// Удалить элемент в атрибуте, который является массивом
open_doc.TopElem.func_managers[0].Delete();

// Сохранить документ
open_doc.Save();

// Удалить документ
DeleteDoc(UrlFromDocID(5293675553778464355));
```

## Создание копии объекта

```js
// Создаем новый XML документ по указанному шаблону
copy_doc = tools.new_doc_by_name('event');

// Получаем TopElem объекта, который будем копировать 
doc = OpenDoc(UrlFromDocID(5293675553778464355)).TopElem;

// Копируем с помощью метода AssignElem() (подробнее http://docs.datex.ru/article.htm?id=5620250451197911713)
copy_doc.TopElem.AssignElem(doc);
copy_doc.BindToDb(DefaultDb);
copy_doc.Save();
```

## Заполнение полей объекта данными из другого объекта

```js
// Выбираем атрибут объекта(шаблон `event`), который будем заполнять
// В данном примере это будет елемент `tutor`(преподаватель) который не заполнен полностью
emptyElem = OpenDoc(UrlFromDocID(6237456404705184852)).TopElem.tutors.ObtainChildByKey(5293675553778464355);

/**
 * Заполняем пустые поля елемента `tutor` (person_fullname, person_position_name, person_org_name, person_subdivision_name) соответствующими данными из каталога`collaborator`
 * @param  {String} catalog название каталога из которого будем брать данные 
 * @param  {Object} filledObject елемент, который заполняем
 * @param  {Int} infoObjectID ID элемента из которого берем данные для наполнения
 * @param  {Object} (Необязательный аргумент) infoObjectTopElem TopElem объекта из которого берем для наполнени
 * @return {Bool}
 tools.common_filling(catalog, filledObject, infoObjectID, infoObjectTopElem);
 */
tools.common_filling('collaborator', emptyElem, 5293675553778464355); 

// сохраняем изменения
docEvent.Save();
```



