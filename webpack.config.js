// отсюда будет браться конфигурация проекта
// это типа gulp.js

const path = require('path') // подключаем модуль из npm node_modules встроенный модуль, он будет помогать с путями в нашей файловой системы компа
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // подключаем скаченный модуль для очистки папок
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production' // определяем в каком режиме сборки мы сейчас находимся -> production, через системную переменную
const isDev = !isProd // или режим разработки

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}` // это нужно чтобы передавать хэш файлам только в режиме продакшен

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'] // этот плагин обрабатывает babel, нужен он для поддержки полей классов static которые еще не поддерживаются браузерами
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader') // если в режиме разработки, то добавляем в loaders(который запускаем в module > use ниже в коде), данные пакет будет принимать файлы js и обрабатывать их на чистоту кода
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),     // данное свойство отвечает за то где лежат все наши исходники а не системные файлы типа(node_modules, package.json итд). Путь указываем с помощью path который определеяет абсолютный путь + конкатенация с src это и будет итоговая директория где брать исходники
  mode: 'development',   // это мы указываем что находися в режиме разработки
  entry: ['@babel/polyfill', './index.js'],    // здесь указываем входные точки приложения
  output: {              // здесь указываем куда выводит файлы
    filename: filename('js'),  // название файла куда все сложится, hash делает так что браузер открывая туже страницу не будет думать что она старая и применять кэш, а будет скачивать по новой, т.е. всегда актуальные данные будут
    path: path.resolve(__dirname, 'dist') // куда сложится dist это папка с абсолютным путем
  },
  resolve: {  // загружает файлы
    extensions: ['.js'], // это по умолчанию формат
    alias: { // для сокращения кода (псевдонимы типа переменные)
      '@': path.resolve(__dirname, 'src'), // если пишем @ то вместо него подставится абсолютный путь до папки src
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false,  // source-map это параметр который понимает webpack он создает карту файлов, только в режиме разработки
  devServer: {  // сервер для динамического обновления
    port: 3000,
    hot: isDev  // сервер будет запускатся только для режима Dev
  },
  plugins: [ // здесь перечисляем плагины которые скачали
    new CleanWebpackPlugin(),  // очистки папок, при запуске npm run build он чистит папку и оставляем только 1 свежий js файл
    new HTMLWebpackPlugin({
      template: 'index.html',  // откуда берем шаблон для html, чтобы плагин сам его не генерировал. Конкретную папку можно не указывать т.к. мы указали контекст выше context (указали где брать исходники) там указали что берем из папки src
      minify: { // минифицирование html файла
        removeComments: isProd,     // удаление комментарий если isProd === true т.е. в режиме продакшен
        collapseWhitespace: isProd  // тоже самое только в режиме production
      }
    }),
    new CopyPlugin({ // данный плагин нужен чтобы переносить favicon
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'), // откуда берем
          to: path.resolve(__dirname, 'dist') // и куда переносим
        }
      ],
    }),
    new MiniCssExtractPlugin({  // выносит css из js
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,  // работа с Sass/Scss файлами
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // это не написано в документации, пишем сами. Это минификация css. Loader пропускает через себя и минифицирует
            options: {
              hmr: isDev, // работает она только при режиме Dev
              reloadAll: true // перезагрузка при изменении файла
            }
          },
          'css-loader', // затем выполнятеся этот и потом то что выше
          'sass-loader' // сначала выполняется этот лодер
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()       // самописная функция
      }
    ],
  }

}

