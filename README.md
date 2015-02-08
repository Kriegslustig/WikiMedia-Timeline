# WikiMedia-Timeline
A nodejs app that uses the WIkiMedia allimages API to create a Timeline

# URL structure
* /
* /about

http://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&format=json&ailimit=10&aistart=1136073600&aiend=1236073600&aisort=timestamp&rawcontinue

http://en.wikipedia.org/w/api.php/?action=query&titles=File:BoxerSoldiers.jpg&prop=imageinfo&iiprop=url|parsedcommen
http://en.wikipedia.org/w/api.php?action=query&titles=1901&prop=images