import {ExcelComponent} from '@core/ExcelComponent' // импортируем для наследования класс

export class Header extends ExcelComponent { // экспортируя создаем класс и расширяем его унаследованным классом ExcelComponents
  static className = 'excel__header'

  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица"/>
      <div>
          <div class="button">
              <span class="material-icons">delete</span>
          </div>
          <div class="button">
              <span class="material-icons">exit_to_app</span>
          </div>
      </div>
    `
  }
}
