# Работа с регулярными выражениями

```js
  // Создаем объект RegExp
 var RegExpObj = tools_web.reg_exp_init();
 // Также для создания можно использовать код:
 // var RegExpObj = new ActiveXObject('VBScript.RegExp');
 // RegExpObj.Global = true;
 // RegExpObj.IgnoreCase = true;
 // RegExpObj.MultiLine = true;

 // Задаем шаблон
 RegExpObj.Pattern = "Pr[ie]ve[dt]";

 // Строка с которой будем работать
 example_string = "Preved Webtutor";

 // Проверка строки на совпадение с шаблоном
 checker_preved = RegExpObj.Test(example_string);
 checker_hello = RegExpObj.Test("Hello");
 // checker_preved = true
 // checker_hello = false

 // получить объект с фрагментами текста, которые удовлетворяют условию шаблона
 var finded_object = RegExpObj.Execute("Preved Webtutor! Privet Webtutor!");
 // finded_object.Count() = 2
 // finded_object.item(0) = "Preved"
 // finded_object.item(1) = "Privet"

 // Заменить найденные фрагменты текста
 replace_result_string = RegExpObj.Replace("Preved Webtutor! Privet Webtutor!", "Aloha");
 // replace_result_string = "Aloha Webtutor! Aloha Webtutor!"
```

Для получения информации по регулярным выражениям в WebtTutor, воспользуйтесь поиском Google по запросу `VBScript.RegExp`.

