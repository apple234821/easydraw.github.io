const canvas = document.getElementById('canvas'),
      colors = document.querySelectorAll('#colors > span'),
      clear = document.querySelector('.clear');


// 畫筆預設
const context = canvas.getContext('2d');
context.lineWidth = 4;
context.strokeStyle = '#000';

var isDrawing = false;
var state = context.getImageData(0, 0, canvas.width, canvas.height);


// 切換顏色
for( let i = 0; i < colors.length; i++ ){
  colors[i].addEventListener('click', function(){
    context.strokeStyle = this.className;
  }, false);
}

// reset
clear.addEventListener('click', function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}, false);

// canvas 滑鼠操作事件
canvas.addEventListener('mousedown', startDarw, false);
canvas.addEventListener('mousemove', drawing,   false);
canvas.addEventListener('mouseup',   stopDrawing, false);

function changeStep(e){
  // 清除畫布
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(e.state){
    context.putImageData(e.state, 0, 0);
  }
}

function stopDrawing(e){
  isDrawing = false;
}

function drawing(e){
  if(isDrawing){
    context.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    context.stroke();
  }
}
function startDarw(e){
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}
