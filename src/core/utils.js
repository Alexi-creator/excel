// здесь будут хранится вспомогательные функции которые не привязаны к конкретному участку кода
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1) // Делаем 1-й символ с заглавной буквы и склеиваем с остальными символами строки без 1-ой буквы
}
