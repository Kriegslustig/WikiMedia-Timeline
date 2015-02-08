var wikiQueryer = require('./wikiQueryer.js')

module.exports = {
  getTimeline: function (start, end, imagesPer10Years, callback) {
    var returnArr = []
    for (var currentYear = start - 1; currentYear < end; currentYear++) {
      wikiQueryer.queryImagesOnPage(currentYear, function (currentYearImages, currentYear) {
        returnArr.push({images: currentYearImages})
        if(currentYear + 1 == end) {
          callback(returnArr)
        }
      })
    }
  }
}