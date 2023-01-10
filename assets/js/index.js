let textElement;
const letterPairs = [];
let offset = -window.scrollY;
let wrapper;
let cWidth = 20;
let cHeight = 20;
let startRadius = 200;

window.addEventListener('load', () => {

    
    const container = document.querySelector('.container');
    const project = document.querySelector('.project');

    container.classList.add('show_page');

    let out = '';

    for (key in projects) {
        out += '<div class="project_item">'
        out += '<img src="./content/images/' + projects[key].image + '" alt="' + projects[key].name + '">';
        out += '<a href="' + projects[key].link + '" target="_blank" class="project_item" data-id="' + key + '">';
        out += projects[key].name;
        out += '</a>';
        out += '</div>';
    }

    project.innerHTML += out;




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
        offset = -window.scrollY;
        update();
    });
    update();



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
});














const Star = function (x, y, z) {

    this.x = x; this.y = y; this.z = z;

    this.size = 5;

};

var context = document.querySelector("#bg").getContext("2d");

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var stars = new Array();

var max_depth = 7500;

for (let index = 0; index < 200; index++) stars[index] = new Star(Math.random() * width, Math.random() * height, index * (max_depth / 200));

function loop() {

    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "transparent";
    context.fillRect(0, 0, width, height);

    for (let index = stars.length - 1; index > -1; index--) {

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







document.querySelectorAll('.text_elem').forEach(element => {
    dragElement(element);
});

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}