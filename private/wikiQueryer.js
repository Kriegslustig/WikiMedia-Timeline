var http = require('http')
module.exports = {
  baseWikiApiURL: 'http://en.wikipedia.org/w/api.php'
, queryImagesOnPage: function (pageTitle, callback) {
    var self = this
    self.query('?format=json&action=query&prop=images&titles=' + pageTitle, function (response) {
      var allImagesData = []
    , images = []
      images = self._getResponseData(response).images
      images.forEach(function (image, index) {
        self.queryImageData(image.title, function (imageDataResponse) {
          imageInfo = self._getResponseData(imageDataResponse).imageinfo[0]
          console.log(imageInfo.parsedcomment)
          allImagesData.push({
            imageUrl: imageInfo.url
          , imageDescription: imageInfo.parsedcomment
          })
          if(index == images.length - 1) {
            callback(allImagesData, pageTitle)
          }
        })
      })
    })
  }
, queryImageData: function (imageTitle, callback) {
    var self = this
    self.query('?format=json&action=query&titles=' + encodeURIComponent(imageTitle) + '&prop=imageinfo&iiprop=url|parsedcomment', callback)
  }
, query: function (url, callback) {
    var self = this
  , queryResponse = ''
    http.get(self.baseWikiApiURL + url, function (res) {
      console.log('Requesting ' + self.baseWikiApiURL + url)
      res.on('data', function (data) {
        queryResponse += data
      })
      res.on('end', function () {
        parsedQueryResponse = JSON.parse(queryResponse)
        callback(parsedQueryResponse)
      })
      res.on('error', function (error) {
        console.log('Connection failed:')
        console.log(error)
      })
    })
  }
, _getResponseData: function (someObject) {
    var returnVal = []
    for(prop in someObject.query.pages) {
      if(someObject.query.pages.hasOwnProperty(prop)) {
        returnVal = someObject.query.pages[prop]
      }
    }
    return returnVal
  }
}