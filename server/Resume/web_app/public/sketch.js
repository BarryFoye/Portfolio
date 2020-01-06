let img;

function preload() {
    img = loadImage(`./images/img2.png`);
}

function setup() {
    let canvas = createCanvas(400, 400);

    canvas.parent('left_content');
    image(img, 0, 0);

}

