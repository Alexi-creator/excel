// здесь будем описывать методы для удобной работы с DOM деревом, аля jQuery
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }
  // данные методы этого класса доступны для каждого компонента, т.к. создавая компоненты мы использовали этот класс, класс компонента расширен этим классом dom
  html(html) {
    if (typeof html === 'string') { // по типу геттер и сеттер
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim() // trim удаляет в начале и в конце пробелы
  }

  clear() {
    this.html('')
    return this
  }

  // данный метод вызывается из DomListener он добавляет слушателя события для компонента например слушать ckick
  on(eventType, callback) { // eventType это то что мы слушаем, то что передали в каждом компоненте (например для Formula это input click), а callback это
    this.$el.addEventListener(eventType, callback)   // $el это сам div компонента, у которого уже есть нативный метод addEventListener
  }

  // данный метод будет удалять из DomListener слушание событий компонентов
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {  // если нода является сущностью класса Dom
      node = node.$el           // то используем свойство класса Dom
    }
    if (Element.prototype.append) { // если у элемента присутствует в прототайпе такой метод
      this.$el.append(node) // то используем его
    } else {
      this.$el.appendChild(node) // иначе используем старый метод
    }
    return this
  }
}

// данную ф-ю вызываем в Excel.js возвращает экземпляр класса Dom который здесь выше описан
export function $(selector) {
  return new Dom(selector)  // при создании эземпляра передаем аргумент
}

$.create = (tagName, classes = '') => { // (статический метод) функция как метод или свойство функции $
  const el = document.createElement(tagName)  // которая помогает создавть элементы по тегу + класс
  if (classes) {
    el.classList.add(classes)
  }
  return $(el) // возвращаем результат запуска функции $ которая возвращает эземпляр класса dom
}
