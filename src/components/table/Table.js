import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template' // импортируем ф-ю для генерирования таблицы

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return createTable(20)  // вызываем отдельную ф-ю которая будет генерировать таблицу
  }
}
