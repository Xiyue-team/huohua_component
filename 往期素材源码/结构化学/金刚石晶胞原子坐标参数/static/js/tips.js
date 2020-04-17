window.onload = function() {
  addEvent();
};

function addEvent() {
  var defaultprompt = document.getElementById('defaultprompt');
  var vertex = document.getElementById('vertex');
  var face = document.getElementById('face');
  var internal = document.getElementById('internal');
  var noGap = document.getElementById('noGap');
  var perspective = document.getElementById('perspective');

  var button2 = document.getElementById ('button2');
  var button4 = document.getElementById ('button4');
  var button6 = document.getElementById ('button6');
  var button8 = document.getElementById ('button8');
  var buttons = document.getElementsByClassName('noselect');

  button2.addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'block';
    face.style.display = 'none';
    internal.style.display = 'none';
    noGap.style.display = 'none';
    perspective.style.display = 'none';
  });

  button4.addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'none';
    face.style.display = 'block';
    internal.style.display = 'none';
    noGap.style.display = 'none';
    perspective.style.display = 'none';
  });

  button6.addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'none';
    face.style.display = 'none';
    internal.style.display = 'block';
    noGap.style.display = 'none';
    perspective.style.display = 'none';
  });

  button8.addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'none';
    face.style.display = 'none';
    internal.style.display = 'none';
    noGap.style.display = 'block';
    perspective.style.display = 'none';
  });

  buttons[1].addEventListener('click', function() {
    defaultprompt.style.display = 'block';
    vertex.style.display = 'none';
    face.style.display = 'none';
    internal.style.display = 'none';
    noGap.style.display = 'none';
    perspective.style.display = 'none';
  });

  buttons[6].addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'none';
    face.style.display = 'none';
    internal.style.display = 'none';
    noGap.style.display = 'none';
    perspective.style.display = 'block';
  });

  buttons[7].addEventListener('click', function() {
    defaultprompt.style.display = 'none';
    vertex.style.display = 'none';
    face.style.display = 'none';
    internal.style.display = 'none';
    noGap.style.display = 'none';
    perspective.style.display = 'block';
  });


}