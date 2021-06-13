let textElement;
const letterPairs = [];
let offset = -window.scrollY;
let wrapper;
let cWidth = 20;
let cHeight = 20;
let startRadius = 200;

window.addEventListener('load', () => {
    wrapper = document.getElementById('wrapper');
    textElement = document.getElementById('text');
    const input = textElement.innerHTML;
    const split = input.split('');

    textElement.innerHTML = '';

    split.forEach((character, i) => {
        const container = document.createElement('div');
        container.className = 'container_circle';
        container.style.zIndex = (split.length - i);
        wrapper.appendChild(container);

        const inner = document.createElement('span');
        inner.className = 'inner';
        inner.innerHTML = character;
        container.appendChild(inner);

        letterPairs.push([container, inner]);
    });

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('scroll', () => {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        // console.log(scrolled)
        if (scrolled >= document.documentElement.clientHeight) {
            offset = -window.scrollY;
            update();
        } else {
            offset = 0;
            update();
        }
    });
    update();
});

function resize() {
    document.body.style.height = (letterPairs.length * cWidth) + window.innerHeight + (window.innerWidth / 2) - (cWidth / 2);
}

function update() {
    let radius = startRadius;
    let angle = 0;
    let x = offset;

    letterPairs.forEach(pair => {
        const container = pair[0];
        const inner = pair[1];

        if (x < -window.innerWidth / 2 - cWidth) {
            container.style.display = 'none';
        }
        else if (x < cWidth / 2) {
            container.style.left = x + 'px';
            container.style.display = 'block';

            inner.style.top = `-${startRadius}px`;
            container.style.transform = 'rotate(0deg)';
        }
        else {
            const circumference = 2 * Math.PI * radius;

            container.style.left = '0';
            container.style.display = 'block';

            if (!angle) {
                angle = (x / circumference) * 360;
                radius -= (x / circumference) * cHeight;
            }

            inner.style.top = -radius + 'px';
            container.style.transform = `rotate(${angle}deg)`;

            angle += (cWidth / circumference) * 360;
            radius -= (cWidth / circumference) * cHeight;
        }

        x += cWidth;
    });
}











document.querySelector('header').addEventListener('click', function(e){
    console.log('tedt')
    const body = document.querySelector('body');
    const heart =document.createElement('span');
    heart.classList.add('cursor');
    let x =e.offsetX;
    let y = e.offsetY;

    heart.style.left = x+'px';
    heart.style.top = y+'px';
    let size = Math.random() * 100;
    heart.style.width = 20+size+'px';
    heart.style.height = 20+size+'px';
    body.appendChild(heart);

    setTimeout(function(){
        heart.remove();
    }, 3000);
})










window.onload = function() {
	var canvas = document.getElementById("preloader"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		particles = [],
		numParticles = 100;

		context.fillStyle = '#fff';

	for(var i = 0; i < numParticles; i += 1) {
		particles.push(particle.create(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2));
	}

	update();

	function update() {
		context.clearRect(0, 0, width, height);

		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			p.update();

			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
			context.fill();
		}
		requestAnimationFrame(update);
    }
    
    
    setTimeout(function(){
        document.querySelector('#preloader').classList.add('hide_preloader');    
    }, 1000)
};

























const Star = function(x, y, z) {

    this.x = x; this.y = y; this.z = z;

    this.size = 5;

  };

  var context = document.querySelector("#bg").getContext("2d");

  var height = document.documentElement.clientHeight;
  var width  = document.documentElement.clientWidth;

  var stars = new Array();

  var max_depth = 7500;

  for(let index = 0; index < 200; index ++) stars[index] = new Star(Math.random() * width, Math.random() * height, index * (max_depth / 200));

  function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width  = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width  = width;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    for (let index = stars.length - 1; index > -1; index --) {

      let star = stars[index];

      star.z -= 5;

      if (star.z < 0) {

        stars.push(stars.splice(index, 1)[0]);
        star.z = max_depth;
        continue;

      }

      let translate_x = width * 0.5;
      let translate_y = height * 0.5;

      let field_of_view = (height + width) * 0.5;

      let star_x = (star.x - translate_x) / (star.z / field_of_view) + translate_x;
      let star_y = (star.y - translate_y) / (star.z / field_of_view) + translate_y;

      let scale = field_of_view / (field_of_view + star.z);

      let color = Math.floor(scale * 256);

      context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
      context.fillRect(star_x, star_y, star.size * scale, star.size * scale);

    }

  }

  loop();