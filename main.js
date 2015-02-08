var express = require('express')
, app = express()
, templateManager = require('./private/templateManager.js')
, timelineGetter = require('./private/timelineGetter.js')

app.set('view engin', 'handlebars')

app.get('/', function (req, res) {
  timelineGetter.getTimeline(1, 2, 5, function (timelineData) {
    templateManager.renderWithLayout('timeline', {years: timelineData}, '', function (renderedHTML) {
      res.send(renderedHTML)
    })
  })
})

app.listen(3000)