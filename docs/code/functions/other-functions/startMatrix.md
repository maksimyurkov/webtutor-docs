# startMatrix()

```js
/**
 * Запускает матрицу("Назначения для пользователей").
 * @param  {Integer} id ID матрицы
 * @return {undefined}
 */
function startMatrix(id) {
  CurMatrix = OpenDoc(UrlFromDocID(id)).TopElem;
  EvalCodeUrl('wtv_user_assignment.js');
}

// Пример
startMatrix(1256742292234664231);
```