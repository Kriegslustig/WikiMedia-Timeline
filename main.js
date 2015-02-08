var express = require('express')
, app = express()
, templateManager = require('./private/templateManager.js')

app.set('view engin', 'handlebars')

app.get('/', function (req, res) {
  var timelime = templateManager.renderWithLayout('timeline', {}, '', function (renderedHTML) {
    res.send(renderedHTML)
  })
})

app.listen(3000)