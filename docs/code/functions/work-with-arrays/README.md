# Работа с массивами

| Название | Описание | Тип |
| :--- | :--- | :--- |
| [ArraySelect()](#arrayselect) | Выбирает элементы массива, удовлетворяющие заданному критерию. | Встроенная |
| [ArrayCount()](#arraycount) | Возвращает число элементов массива. | Встроенная |
| [ArrayExtract()](#arrayextract) | Выбирает определенное значение из каждого элемента массива. Возвращает новый массив той же длинны, содержащий выбранные элементы. | Встроенная |
| [ArraySelectDistinct()](#arrayselectdistinct) | Возвращает массив уникальных значений элементов заданного массива. | Встроенная |
| [ArrayUnion()](#arrayunion) | Последовательное объединяет нескольких массивов в один. | Встроенная |
| [ArrayFind()](#arrayfind) | Находит первый элемент массива, удовлетворяющий заданному условию. | Встроенная |
| [ArrayOptFirstElem()](#arrayoptfirstelem) | Возвращает первый элемент заданного массива. | Встроенная |

## ArraySelect()

```js
/**
 * Выбирает элементы массива, удовлетворяющие заданному критерию.
 * @param  {Array} array   массив
 * @param  {Boolean} qulExpr ID выражение, определяющее соответствие элемента массива критерию. Вычисляется относительно элемента массива.
 * @return {Array}
 */
function ArraySelect(array, qulExpr) {...}

// Пример
// Выбрать элементы у которых атрибут 'basic_collaborator_id' содержит значение
ArraySelect(XQuery("CatalogHierSubset('subs', 5296742292364664534)"), "basic_collaborator_id.HasValue");

// Выбрать элементы которые удовлетворяют условию
ArraySelect(XQuery("for $elem in learnings return $elem"),'This.score>10');
```

## ArrayCount()

Для массивов прямого доступа функция срабатывает мгновенно, для сложных массивов (например результатов XQuery) вызов этой функции может повлечь за собой обращение к серверу либо другую длительную по времени операцию, поэтому не следует использовать данную функцию внутри циклов.

```js
/**
 * Возвращает число элементов массива. 
 * @param  {Array} array массив
 * @return {Integer}
 */
function ArrayCount(array) {...}

// Пример
arr = [1,2,3];
ArrayCount(arr);
// 3
```

## ArrayExtract()

```js
/**
 * Выбирает определенное значение из каждого элемента массива. Возвращает новый массив той же длинны, содержащий выбранные элементы.
 * @param  {Array} array      массив
 * @param  {String} fieldExpr выражение, вычисляемое относительно каждого элемента исходного массива
 * @return {Array}
 */
function ArrayExtract(array, fieldExpr) {...}

// Пример
// Взять из массива объектов только значения `id`
ArrayExtract(XQuery('for $elem in polls where $elem/is_main = true() return $elem'), 'id');
// [{id:5796971352983414117},{id:5296742292364664534},{id:5607317807203771898}]
```

## ArraySelectDistinct()

```js
/**
 * Возвращает массив уникальных значений элементов заданного массива.
 * @param  {Array} array      массив
 * @param  {String} fieldExpr выражение, вычисляемое относительно каждого элемента исходного массива. Если аргумент не указан, используется значение самого элемента (This). Необязательный аргумент.
 * @return {Array}
 */
function ArraySelectDistinct(array, fieldExpr) {...}

// Пример
// Получить массив с уникальными значениями course_id
ArraySelectDistinct(XQuery('for $elem in learnings where $elem/person_id=5968567069372079247 return $elem'), 'course_id');
```

## ArrayUnion()

```js
/**
 * Последовательное объединение нескольких массивов в один.
 * @param  {Array} array1 массив
 * @param  {Array} array2 массив
 * @return {Array}
 */
function ArrayUnion(array1, array2) {...}

// Пример
arr1 = XQuery("for $elem in test_learnings order by $elem/last_usage_date descending return $elem");
arr2 = XQuery("for $elem in active_test_learnings order by $elem/last_usage_date descending return $elem");
arr3 = XQuery("for $elem in active_learnings order by $elem/last_usage_date descending return $elem");
arr4 = XQuery("for $elem in learnings order by $elem/last_usage_date descending return $elem");
all = ArrayUnion(arr1, arr2, arr3, arr4);
```

## ArrayFind()

```js
/**
 * Находит первый элемент массива, удовлетворяющий заданному условию. Если элемент, удовлетворяющий условию, не найден, функция завершается с исключением.
 * @param  {Array}  array     массив
 * @param  {String} qualExpr  выражение, определяющее соответствие элемента массива критерию. Вычисляется относительно элемента массива
 * @return {undefined}
 */
function ArrayFind(array, qualExpr) {...}

// Пример
ArrayFind(XQuery("for $elem in events return $elem"),'This.duration_fact>50');
```

## ArrayOptFirstElem()

```js
/**
 * Возвращает первый элемент заданного массива. Если массив не содержит ни одного элемента, функция возвращает undefined.
 * @param  {Array}  array     массив
 * @return {undefined}
 */
function ArrayOptFirstElem(array) {...}

// Пример
ArrayOptFirstElem(XQuery("for $elem in events return $elem"));
```


















