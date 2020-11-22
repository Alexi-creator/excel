import {$} from '@core/dom' // написали функцию которая помогает создавть элементы и задавать им класс

export class Excel { // это сам компонент который будет содержать другие компоненты
  // при создании эземпляра от этого класса, можно передать аргументы, в нашем случае при создании эзепляра мы передаем id и объект, в конструкторе шаблона класса описываем что делать с ними
  constructor(selector, options) {
    this.$el = $(selector) // this это созданный эземпляр от этого класса, он объект а значит задаем ему свойство $el в которое помещаем элемент по id # с помощью функции которая лежит в файле dom.js
    this.components = options.components || []  // так же задаем экземпляру св-во в котором будет лежать массив переданный при создании экземпляра через аргумент как объект у которого массив записан в свойство components, но если массива нет переданного то чтобы ошибки не было указываем ИЛИ || пустой массив []
  }
  // данный метод создаем для создания блока div который будет рендерится добавлятся в методе render
  getRoot() {
    // создать обертку блок в которую будем помещать разметку html компонентов
    const $root = $.create('div', 'excel')
    // ниже это то же самое без доп функции $ которую мы описали в dom.js
    // const $root = document.createElement('div')
    // $root.classList.add('excel')  // добавляем класс селектор для созданного div'a

    // проходим циклом по каждому компоненту принятому в кострукторе
    // и поскольку компоненты являются классами создаем их экземпляры
    // и каждый компонент имеет свой метод который возвращаем html его мы и вставляем в div root который заготовили
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      // const $el = document.createElement('div') // это див обертка для каждого элемента компонента
      // $el.classList.add(Component.className)  // добавляем класс(селектор) через класс компонентов static обращаясь на прямую к классу без создания экземпляра

      const component = new Component($el)  // при создании экземпляра передаем div элемент, его будет слушать DomListener там он в конструкторе инициализируется
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)
      return component  // map возвращает массив, массив готов нод компонентов html на странице и функции доступные для них
    })
    return $root
  }

  // создаем метод, рендер это когда что то складываем в шаблон
  render() {
    this.$el.append(this.getRoot()) // this.$el это то что мы определили в конструкторе выше (в index.html это div с id = app) добавляем в него div'ы компонентов уже реальные ноды со своими классами и внутренней разметкой html на страницу
    this.components.forEach(component => component.init()) // проходимся по компонентам и вызываем для всех метод init() из ExcelComponent
  }
}
