var handlebars = require('handlebars')
, fs = require('fs')

module.exports = {
  templatesDirectory: 'public/templates/' // this needs a trailing slash
, templatesExtension: '.html'
, defaultLayout: 'layout'
, render: function (templateName, data, callback) {
    var self = this
    self._openTemplate(templateName, function (templateFile) {
      var renderedTemplate = self._renderTemplate(templateFile, data)
      callback(renderedTemplate)
    })
  }
, renderWithLayout: function (templateName, bodyData, head, callback, layout) {
    var self = this
    self.render(templateName, bodyData, function (renderedTemplate) {
      var layoutData = {
        body: renderedTemplate
      , head: head
      }
      layout = layout || self.defaultLayout
      self.render(layout, layoutData, function (renderedLayoutTemplate) {
        callback(renderedLayoutTemplate)
      })
    })
  }
, _openTemplate: function (templateName, callback) {
    var self = this
    fs.readFile(self.templatesDirectory + templateName + self.templatesExtension, function (err, data) {
      if(!err) {
        callback(data.toString())
      } else {
        console.log(err)
      }
    })
  } // returns a template file's content
, _renderTemplate: function (file, data) {
    var template = handlebars.compile(file)
    return template(data)
  } // renders a template and returns the rendered html
}