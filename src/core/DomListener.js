import {capitalize} from '@core/utils'

// данный класс DomListener он добавляет и удаляет слушание событий типа onClick, onInput
export class DomListener { // создаем класс и сразу же его экспортируем
  constructor($root, listeners = []) {     // будем принимать какой либо элемент(компонент) и элементы этого компонента чтобы прослушивать их, принимаем его из компонента класса ExcelComponents (такая архитектура нашего приложения)
    if (!$root) {          // перехватываем ошибку в случае если нет переданного элемента
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root          // это непосредственно div компонента сущности еще не сам div в html
    this.listeners = listeners  // а это то что должны слушать у компонента, например у Formula слушаем input
  }

  initDOMListeners() {
    // в this.listeners у нас события которые мы хотим слушать
    this.listeners.forEach(listener => {  // использую стрелочную ф-ю, т.к. она не имеет this а значит вызывая this.$root мы обращаемся к экземпляру класса инициализированного в кострукторе а не к this.listeners.forEach
      const method = getMethodName(listener) // используем созданную отдельную ф-ю которая возвращает строку с заглавной буквы + on спереди, пример по сути в const method = onInput
      // ниже проверка на то если какое то из событий например click нами еще не описано
      if (!this[method]) {
        const name = this.name || ''  // this.name приходит из ExcelComponent
        throw new Error(`Метод ${method} еще не реализован в ${name} компоненте`)
      }
      this[method] = this[method].bind(this)
      // ниже строчка это тоже самое что и addEventListener + привязываем контекст иначе в dom в методе on будет ошибка
      this.$root.on(listener, this[method])   //  если бы использовали обычную ф-ю здесь была бы ошибка т.к. применился бы контекст, метод on описан в dom классе
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

// данная ф-я вне класса она добавляет on к строке которую приводим к заглавной строке, это все нужно для названия события например input превращаем в onInput
// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

