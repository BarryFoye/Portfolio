const SCALING_FACTOR = 1;

function setup() {
  createCanvas(640, 360);
  noFill();
}

function draw() {
  background(50);
  let hr;
  let min;
  let sec;
  hr = hour();
  min = minute();
  sec = second();
  let str = hr + ":" + ((min < 10) ? ("0" + min) : min) + ":" + ((sec < 10) ? ("0" + sec) : sec);
  strokeWeight(1);
  // relative boxes
  //HOUR
  stroke(255, 79, 100);
  square(10, 10, hr * SCALING_FACTOR);
  line(33, 10, 33, 33);
  //MINUTE
  stroke(79, 100, 255);
  square(44, 10, min * SCALING_FACTOR);
  line(103, 10, 103, 69);
  //SECOND
  stroke(100, 255, 79);
  square(114, 10, sec * SCALING_FACTOR);
  line(173, 10, 173, 69);

  // Box with indication
  let hr_map = map(hr, 0, 24, 0, 100);
  let min_map = map(min, 0, 60, 0, 100);
  let sec_map = map(sec, 0, 60, 0, 100);
  //HOUR
  stroke(255, hr_map + min_map + sec_map, 100);
  square(10, 80, hr_map);
  //DIGITAL DISPLAY
  text(hr, 15, 95);
  line(8, 78, 8, 182);
  line(8, 78, 15, 78);
  line(8, 182, 15, 182);
  line(112, 78, 112, 182);
  line(112, 78, 105, 78);
  line(112, 182, 105, 182);
  //MINUTE
  stroke(100, 255, hr_map + min_map + sec_map);
  square(120, 80, min_map);
  //DIGITAL DISPLAY
  text(((min < 10) ? ("0" + min) : min), 125, 95);
  line(118, 78, 118, 182);
  line(118, 78, 125, 78);
  line(118, 182, 125, 182);
  line(222, 78, 222, 182);
  line(222, 78, 215, 78);
  line(222, 182, 215, 182);
  //SECOND
  stroke(hr_map + min_map + sec_map, 100, 255);
  square(230, 80, sec_map);
  //DIGITAL DISPLAY
  text(((sec < 10) ? ("0" + sec) : sec), 235, 95);
  line(228, 78, 228, 182);
  line(228, 78, 235, 78);
  line(228, 182, 235, 182);
  line(332, 78, 332, 182);
  line(332, 78, 325, 78);
  line(332, 182, 325, 182);

  //circular
  let clock_hr = createVector(60, 242, hr_map);
  let clock_min = createVector(60, 242, min_map);
  let clock_sec = createVector(60, 242, sec_map);
  //HOUR
  stroke(255, hr_map + min_map + sec_map, 100);
  circle(clock_hr.x, clock_hr.y, clock_hr.z);
  //MINUTE
  stroke(100, 255, hr_map + min_map + sec_map);
  circle(clock_min.x, clock_min.y, clock_min.z);
  //SECOND
  stroke(hr_map + min_map + sec_map, 100, 255);
  circle(clock_sec.x, clock_sec.y, clock_sec.z);
  noStroke();

  //bar graph
  //HOUR
  fill(255, hr_map + min_map + sec_map, 100);
  rect(10, 310, hr_map, 10);
  //MINUTE
  fill(100, 255, hr_map + min_map + sec_map);
  rect(10, 320, min_map, 10);
  //SECOND
  fill(hr_map + min_map + sec_map, 100, 255);
  rect(10, 330, sec_map, 10);
  //DIGITAL DISPLAY
  text(str, 10, 350);
  noFill();

  //Time Flies
  //HOUR
  stroke(255, hr_map + min_map + sec_map, 100);
  text(hr, hr_map, 305);
  //MINUTE
  stroke(100, 255, hr_map + min_map + sec_map);
  text(((min < 10) ? ("0" + min) : min), min_map, 305);
  //SECOND
  stroke(hr_map + min_map + sec_map, 100, 255);
  text(((sec < 10) ? ("0" + sec) : sec), sec_map, 305);


  //arc analog/digital clock
  stroke(255);
  line(220, 292, 220, 192);
  line(170, 242, 270, 242);
  angleMode(DEGREES);
  hr_map = map(hr, 0, 12, 0, 360);
  min_map = map(min, 0, 60, 0, 360);
  sec_map = map(sec, 0, 60, 0, 360);
  translate(220, 242);
  rotate(-90);
  push();
  //HOUR
  stroke(255, hr_map + min_map + sec_map, 100);
  arc(0, 0, 50, 50, 0, hr_map);
  //MINUTE
  stroke(100, 255, hr_map + min_map + sec_map);
  arc(0, 0, 60, 60, 0, min_map);
  //SECOND
  stroke(hr_map + min_map + sec_map, 100, 255);
  arc(0, 0, 70, 70, 0, sec_map);
  pop();
}