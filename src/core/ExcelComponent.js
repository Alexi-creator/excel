import {DomListener} from '@core/DomListener' // импортируем модуль DomListener где класс для прослушивания

export class ExcelComponent extends DomListener { // и расширяем данный класс этим модулем, а так же сам модуль тоже экспортируем
  // создаем базовый метод для будущих экземпляров сущностей по данному классу
  // это централизованное место для всех компонентов
  constructor($root, options = {}) {     // принимаем из ExcelComponent ноду и созданный объект
    super($root, options.listeners) // передаем наследуемому классу DomListener
    this.name = options.name || ''
  }

  // возвращет шаблон компонента
  toHtml() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}

