# portfolio
**Прохоров**<br>
**Игорь**<br>
**Михайлович**<br>
**сайт портфолио**<br>
##№Сборка на GULP + Webpack

#### Для работы сборки у вас должны быть установлены
* npm 5
* gulp-cli

#### Как установить проект
1. clone this repo
2. npm i

### Команды:
* Зайти в директорию проекта 
    например: **cd:/d/projects/project/**
* Запустить работу сборки командой:
    **gulp**
* Оптимизация картинок:
    **gulp imgopt**
* Сделать SVG И PNG спрайт:<br>
    * создать директорию  **cd:/d/projects/project/:**<br>
    **mkdir src/sprite-svg**<br>
    * и/или<br>
    **mkdir src/sprite-png**<br>
    * скопировать туда картинки, svg и png соответственно<br>
    * и запустить формирование спрайта/спрайтов <br>
    **gulp sprite** - для обоих спрайтов<br>
    * или<br>
    **gulp sprite-png** - для спрайта PNG<br>
    **gulp sprite-svg** - для спрайта SVG<br> 
    * спрайты искать по адресам:<br>
    **src/img/sprite-svg** -svg<br>
    * и <br>
    **src/img/sprite-png** -png<br>

* P.S. работы продолжаются...                   