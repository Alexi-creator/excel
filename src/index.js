import {Excel} from '@/components/excel/Excel' // импортируем компонент
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import './scss/index.scss' // импортируем scss файл благодаря loader модулю, файл css перейдет в js и здесь будет валиден

// создаем сущность(экзепляр) от импортируемого класса Excel, и в качестве аргумента
// передаем индификатор app который указан в index.html и набор опций через объект
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table] // передаем импортнуе классы просто как функции, еще не создаем экземпляры
})

excel.render()  // вызываем метод рендер который описан в классе Excel Excel.js
