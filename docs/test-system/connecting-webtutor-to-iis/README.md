# Подключение WebTutor к IIS

1. Для удобства, создадим на рабочем столе 3 ярлыка  
   
   * WebTutor Server `C:\Program Files\WebSoft\WebTutorServer\SpXml.exe`
   * WebTutor Administrator `C:\Program Files\WebSoft\WebTutorAdmin\spxml.exe`
   * IIS `%windir%\system32\inetsrv\InetMgr.exe`

   ![](./1.jpg)

2. Переходим в IIS и удаляем там существующие сайты, чтобы ничего не занимало 80 порт. Порт 80 и другие порты, которые вы захотите использовать, могут занимать и другие программы (к примеру Skype, SQL Server Reporting Service, итд любят занимать 80 порт), так что всегда имейте это ввиду и если у вас что-то не будет работать, то возможно ваш порт уже занят какой-то другой программой.  

   ![](./2.jpg)

3. Запускаем WebTutor Server, жмем `Русский`  

   ![](./3.jpg)

4. В появившемся окне, жмем `No` 

   ![](./4.jpg)

5. В закладке Режим работы, ставим галку напротив IIS, в поле порт пишем 8787, жмем `Переключить режим` 
   
   (можно задать любой другой свободный порт на свое усмотрение, хотя тут было бы логично задать порт 80 или 443, но это необязательно и мы не будем трогать эти стандартные порты, так как они в будущем скорее всего пригодятся для чего-нибудь еще)  

   ![](./5.jpg)

6. В появившемся окне жмем `Yes`  

   ![](./6.jpg)

7. После переключения в IIS в Application Pools (Пулы приложений) и в Sites (Сайты) появится WebTutorCorpServer  

   ![](./7.jpg)

8. Перейдите в Application Pools (Пулы приложений), нажмите на WebTutorCorpServer, затем справа на Advanced Settings... (Дополнительные параметры...)  

   ![](./8.jpg)

9. Установите значения следующих параметров  
   **Idle Timeout** = 0  
   **Queue Length** = 10 000  
   **Start Mode** = «Always Running»  
   **Regular Time Interval** = 0  

   ![](./9.jpg)

10. Если используется англоязычная версия Windows, то в параметре Identity укажите учетную запись администратора, под которой будет запускаться пул

    ![](./10.jpg)

11. Нажмите `OK`

12. Перейдите в Sites (Сайты), нажмите на WebTutorCorpServer, по центру на Handler Mappings (Сопоставление обработчиков), затем нажмите на `Add Module Mapping` (Добавить сопоставление модуля)  

    ![](./11.jpg)

13. В открывшемся окне заполните поля  
    **Request path (Путь запроса)** = *  
    **Module (Модуль)** = IsapiModule  
    **Executable (Исполняемый файл)** = файл `IsapiSpx.dll` для 32-битных или `IsapiSpx_64.dll` - для 64-битных операционных систем (файлы находятся тут `C:\Program Files\WebSoft\WebTutorServer`)  
    **Name (Имя)** - WebTutorServer

    Для IIS версий 8.0 и выше откройте пункт Request Restictions, перейдите на вкладку Mapping и выключите флажок Invoke handler only....  

    ![](./12.jpg)

14. Нажмите `ОК`

15. В появившемся окне нажмите `Yes`

    ![](./13.jpg)

16. Перейдите в Sites (Сайты), нажмите на WebTutorCorpServer, по центру войдите в RequestFiltering (Фильтрация запросов)  

    ![](./14.jpg)

17. Затем нажмите на `Edit Feature Settings` (Изменить параметры) 

    ![](./15.jpg)

18. В поле Maximum allowed content lenghth (Максимальная допустимая длина содержимого) напишите 30000000 и нажмите `OK`  

    ![](./16.jpg)

19. Перейдите в главное меню IIS  

    ![](./18.jpg)

20. Войдите в раздел Server Certificates (Сертификаты)  

    ![](./19.jpg)

21. Нажмите `Create Self-Signed Certificate...` (Создать само-подписанный сертификат)

    ![](./20.jpg)

22. В появившемся окне нажмите WebTutorTestSystemCertificate и нажмите `OK`  

    ![](./21.jpg)

23. В IIS в разделе Sites нажмите на WebTutorCorpServer, затем справа нажмите на `Bindings...` (Привязки...)

24. Нажмите `Add...` (Добавить)  

    ![](./22.jpg)

25. В открывшемся окне заполните поля и нажмите `OK`  
    **Type (Тип)** = https  
    **IP address (IP адрес)** = All Unassigned  
    **Port (Порт)** = 8989  
    **SSL certificate (SSL сертификат)** = WebTutorTestSystemCertificate  

    ![](./24.jpg)

26. Выделите строку в которой Port = 8787 и нажмите `Remove` (Удалить) 

    ![](./25.jpg)

27. Затем войдите в оставшуюся строку и смените там порт с 8989 на 8787 и нажмите `OK`

    ![](./23.jpg)

28. Нажмите `Close`  

    ![](./26.jpg)

29. Зайдите в файл `C:\Program Files\WebSoft\WebTutorAdmin\SpXml.ini` и поменяйте там строку  
    \#LDS-HTTPS: 1 на LDS-HTTPS: 1 (это необходимо для входа в WebTutor Administrator по протоколу https)  

    ![](./27.jpg)



