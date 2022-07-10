let Flipper = /** @class */ (function () {
  function Flipper(node, currentTime, nextTime) {
    this.isFlipping = false;
    this.duration = 600;
    this.flipNode = node;
    this.frontNode = node.querySelector(".front");
    this.backNode = node.querySelector(".back");
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
  }

  Flipper.prototype.setFrontTime = function (time) {
    this.frontNode.dataset.number = time;
  };

  Flipper.prototype.setBackTime = function (time) {
    this.backNode.dataset.number = time;
  };

  Flipper.prototype.flipDown = function (currentTime, nextTime) {
    let _this = this;
    if (this.isFlipping) {
      return false;
    }
    this.isFlipping = true;
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
    this.flipNode.classList.add("running");
    setTimeout(function () {
      _this.flipNode.classList.remove("running");
      _this.isFlipping = false;
      _this.setFrontTime(nextTime);
    }, this.duration);
  };

  return Flipper;
})();

let getTimeFromDate = function (date) {
  return date.toTimeString().slice(0, 8).split(":").join("");
};

let flips = document.querySelectorAll(".flip");
let now = new Date();
let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
let nextTimeStr = getTimeFromDate(now);
let flippers = Array.from(flips).map(function (flip, i) {
  return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]);
});

setInterval(() => {
  let now = new Date();
  let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
  let nextTimeStr = getTimeFromDate(now);
  for (let i = 0; i < flippers.length; i++) {
    if (nowTimeStr[i] === nextTimeStr[i]) {
      continue;
    }
    flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
  }
}, 1000);
