// createTable это вспомогательная функция для генерирования таблицы

// Символ А идет под кодом 65 а Z 90 этим и будем пользоваться для создания столбцов таблицы от А до Z
const CODES = {
  A: 65,
  Z: 90
}

// вспомогательная ф-я для создания ячейки таблицы
function toCell() {
  return `
     <div class="cell" contenteditable></div>
   `
}

// вспомогательная ф-я для создания колонок
function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

// вспомогательная ф-я для создания строк
function createRow(index, content) {
  return `
    <div class="row"> 
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
    </div>   
  `
}

function toChar(_, index) { // _ таким нижним подчеркиванием мы обозначаем что параметр не нужен, но чтобы аргумент index попал
  return String.fromCharCode(CODES.A + index) // возвращает буквы по коду (номер символа)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // сколько колонок будет это разница в кодах символов, +1 это чтобы получить символ Z
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar) // ниже написан map который делает тоже самое что эта строка
      // .map((el, index) => {
      //   return String.fromCharCode(CODES.A + index) // возвращает буквы по коду (номер символа)
      // })
      .map(toColumn) // ниже написан map который делает тоже самое что эта строка
      // .map(el => {
      //   return createCol(el)  // добавляем символ в шаблон который возвращаем
      // })
      .join('') // данный массив преобразуем в строку для вставки в html

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
