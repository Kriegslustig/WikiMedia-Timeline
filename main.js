var express = require('express')
, timelineGetter = require('./private/timelineGetter.js')
, templateManager = require('./private/templateManager.js')
, app = express()

app.set('view engin', 'handlebars')

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  from = 1890 || req.query.from
  to = 1891 || req.query.to
  timelineGetter.getTimeline(from, to, 5, function (timelineData) {
    templateManager.renderWithLayout('timeline', {years: timelineData}, '', function (renderedHTML) {
      res.send(renderedHTML)
    })
  })
})

app.listen(3000)