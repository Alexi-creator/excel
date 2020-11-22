import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  // статическое поле, здесь мы принимаем значение селектора excell__formula
  // данное поле(это может быть свойство или метод) в классах относится к самому классу а не к будущим экземплярам
  // т.е. это то же самое что Formula.className у экземпляров нельзя вызвать exzemplyar.className
  static className = 'excel__formula'

  constructor($root) {  // принимает ноду из Excel.js
    super($root, {      // передаем ее в наследуемый класс ExcelComponent и передаем объект которые описали
      name: 'Formula',
      listeners: ['input', 'click']  // здесь перечисляем методы которые напишем как функции отдельно, данные методы будут слушаться DomListeners
    })
  }s

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  // метод для input
  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    console.log()
  }
}
