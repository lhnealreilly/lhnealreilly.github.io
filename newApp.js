const NUM_WAYPOINTS = 20;

var ringPos = [{x:72, y:[6, 12, 18, 24, 48, 54, 60, 84, 90, 96, 120, 126, 132, 138]}, {x:48, y:[43.5, 48, 52.5, 67.5, 72, 76.5, 120]}, {x: 96, y:[24, 67.5, 72, 76.5, 91.5, 96, 100.5]}, 
{x:43.5, y:[48, 72]}, {x:52.5, y:[48, 72]}, {x:91.5, y:[72, 96]}, {x:100.5, y:[72, 96]}, {x: 54, y: [120]}, {x:60, y:[120]}, {x:66, y:[120]}, {x: 78, y: [24]}, {x:84, y: [24]}, {x:90, y:[24]}];

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var staticLayer = new Konva.Layer();
var fieldLayer = new Konva.Layer();
var pathLayer = new Konva.Layer();

/*
 * leave center point positioned
 * at the default which is at the center
 * of the hexagon
 */

var field = new Konva.Rect({
    x: stage.width()/3,
    y: stage.height()/2,
    width: 800,
    height: 800,
    stroke: 'black',
    strokeWidth: '4',
})
field.x(field.x() - field.width()/2);
field.y(field.y() - field.height()/2);

var platform = new Konva.Rect({
    width: field.width() / (144/20),
    height: field.height() /(144/50),
    opacity: .9,
})

var gameObject = new Konva.RegularPolygon({
  x: field.x(),
  y: field.y(),
  sides: 7,
  radius: field.width() / (11.07*2),
  fill: '#000000',
  stroke: 'black',
  strokeWidth: 1,
  draggable: true,
});


var ringObject = new Konva.Rect({
    width: field.width()*4.13 /144,
    height: field.height()*4.13/144,
    cornerRadius: 7,
    strokeWidth: 6,
    stroke: 'purple',
    draggable: true,
})

var path = new Konva.Line({
    stroke: 'black',
    strokeWidth: 4,
})

var pathAnchor = new Konva.Circle({
    radius: 10, 
    fill: 'red',
    draggable: 'true',
    rotation: 90,
})


var text = new Konva.Text({
  x: stage.width()/2,
  y: 10,
  text: 'Auton Planning Tool: VEX Tipping Point',
  fontSize: '30',
  fontFamily: 'Calibri',
  fill: 'black',
});
text.offsetX(text.width()/2);

for(const a of ringPos){
    for(const y of a.y){
        staticLayer.add(ringObject.clone({x:field.x() + field.width()*a.x/144 - ringObject.width()/2, y: field.y() + field.height()*y/144 - ringObject.height()/2}));
    }
}


for(let i = 0; i < 2; i++){
    var redObj = gameObject.clone({fill: 'red'});
    var blueObj = gameObject.clone({fill: 'blue'});
    switch(i){
        case 0:
            redObj.x(field.x() + field.width()*36/144);
            redObj.y(field.y() + field.height()*132/144);
            blueObj.x(field.x() + field.width()*108/144);
            blueObj.y(field.y() + field.height()*12/144);
            break;
        case 1:
            redObj.x(field.x() + field.width()*12/144);
            redObj.y(field.y() + field.height()*41/144);
            redObj.rotation(180/7);
            blueObj.x(field.x() + field.width()*132/144);
            blueObj.y(field.y() + field.height()*101/144);
            break;
    }
    staticLayer.add(redObj);
    staticLayer.add(blueObj);
}
staticLayer.add(text);
for(let i = 0; i < 3; i++ ){
    var yellowHex = gameObject.clone({x: field.x() + field.width()/2, fill: 'yellow'});
    switch(i){
        case 0: 
            yellowHex.y(yellowHex.y()+field.height()/2);
            break;
        case 1: 
            yellowHex.y(yellowHex.y() + field.height()/4);
            break;
        case 2:
            yellowHex.y(yellowHex.y() + field.height()*3/4);
            yellowHex.rotation(180/7);
            break;
    }
    staticLayer.add(yellowHex);
}

//Making the field
fieldLayer.add(field.clone({fill: 'grey'}));
for(let i = 0; i < 6; i++){
    fieldLayer.add(new Konva.Line({points: [field.x()+i*(field.width()/6), field.y(), field.x()+i*(field.width()/6), field.y()+field.height()], strokeWidth: 2, stroke: '#3A3A3A',}));
    fieldLayer.add(new Konva.Line({points: [field.x(), field.y()+i*(field.height()/6), field.x()+field.width(), field.y()+i*(field.height()/6)], strokeWidth: 2, stroke: '#3A3A3A',}));
}
//Mid field double lines
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*73/144, field.y(), field.x() + field.width()*73/144, field.y()+field.height()], strokeWidth: 4, stroke: 'white'}));
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*71/144, field.y(), field.x() + field.width()*71/144, field.y()+field.height()], strokeWidth: 4, stroke: 'white'}));
//Mid field single lines
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*97/144, field.y(), field.x() + field.width()*97/144, field.y()+field.height()], strokeWidth: 4, stroke: 'white'}));
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*47/144, field.y(), field.x() + field.width()*47/144, field.y()+field.height()], strokeWidth: 4, stroke: 'white'}));
//Alliance goal lines
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*97/144, field.y() + field.height()*24/144, field.x() + field.width()*120/144, field.y()], strokeWidth: 4, stroke: 'white'}));
fieldLayer.add(new Konva.Line({points:[field.x() + field.width()*47/144, field.y() + field.height()*120/144, field.x() + field.width()*24/144, field.y()+field.height()], strokeWidth: 4, stroke: 'white'}));
//Platforms
fieldLayer.add(platform.clone({x: field.x() + field.width()*2/144, y: field.y() + field.height()*69/144 - platform.height()/2, fill: '#FFCCCB', stroke: 'red', strokeWidth: '2'}));
fieldLayer.add(platform.clone({x: field.x() + field.width()*122/144, y: field.y() + field.height()*75/144 - platform.height()/2, fill: '#ADD8E6', stroke: 'blue', strokeWidth: '2'}));
//Perimeter
fieldLayer.add(field);

//Simple path
var pathPoints = drawPath(fieldX(12), fieldY(108), 0, fieldX(60), fieldY(90), 0);
var path1  = path.clone({points: pathPoints})
var anchor1 = pathAnchor.clone({x: fieldX(12), y:fieldY(108)})
var anchor2 = pathAnchor.clone({x: fieldX(60), y:fieldY(90)})
pathLayer.add(path1); 
pathLayer.add(anchor1);
pathLayer.add(anchor2);

var tr1 = new Konva.Transformer({
    nodes: [anchor1],
    visible: false,
    resizeEnabled: false,
})
var tr2 = new Konva.Transformer({
    nodes: [anchor2],
    visible: false,
    resizeEnabled: false,
})
pathLayer.add(tr1);
pathLayer.add(tr2);

anchor1.on('click', function(){toggleVis(tr1)});
anchor2.on('click', function(){toggleVis(tr2)});

tr1.on('transform', function(){updatePath(path1, anchor1, anchor2)});
tr2.on('transform', function(){updatePath(path1, anchor1, anchor2)});

//stage.on('click', function(){tr1.visible(false); tr2.visible(false)});

anchor1.on('dragmove', function(){
    updatePath(path1, anchor1, anchor2);
});
anchor2.on('dragmove', function(){
    updatePath(path1, anchor1, anchor2);
});

function updatePath(path, anchor1, anchor2){
    path.points(drawPath(anchor1.x(), anchor1.y(), anchor1.rotation()-90, anchor2.x(), anchor2.y(), anchor2.rotation()-90));
}

function toggleVis(x){
    if(x.visible() == true){
        x.visible(false);
        x.moveToBottom();
    }
    else{
        x.visible(true);
        x.moveToTop();
    }
}


//animLayer.add(blueHex, yellowHex, redHex);
stage.add(fieldLayer);
stage.add(staticLayer);
stage.add(pathLayer);

var save = stage.toJSON();

function fieldX(x){
    return field.x()+ field.width()*x/144;
}
function fieldY(y){
    return field.y() + field.height()*y/144;
}
function saveState(){
    save = stage.toJSON();
}

function reset(){
    stage = Konva.Node.create(save, 'container');
}

function drawPath(x1, y1, th1, x2, y2, th2){
    th1 = th1*Math.PI/180;
    th2 = th2*Math.PI/180;
    var path = [];
  
    let dist = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1), 2));
  
    let p1x = x1+((Math.cos(th1))*dist/3);
    let p1y = y1+((Math.sin(th1))*dist/3);

    let p2x = x2-((Math.cos(th2))*dist/2); 
    let p2y = y2-((Math.sin(th2))*dist/2);
    
    for(let i = 0; i < NUM_WAYPOINTS; i++){
      let t = 1/(NUM_WAYPOINTS-1)*i;
      let s = 1-t;
      let x = Math.pow(s, 3)*x1+3*Math.pow(s, 2)*t*p1x+3*s*Math.pow(t, 2)*p2x+Math.pow(t, 3)*x2;
      let y = Math.pow(s, 3)*y1+3*Math.pow(s, 2)*t*p1y+3*s*Math.pow(t, 2)*p2y+Math.pow(t, 3)*y2;
      path.push(x, y);
    }
    console.log(path);
    return path;
}
