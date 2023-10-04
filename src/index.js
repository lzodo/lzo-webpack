import _ from "lodash";
import "./assets/styles/global.css";
import Icon from "./assets/images/1.jpg";
import printMe from "./print.js";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // 测试第三方库
  element.innerHTML = _.join(["Hello", "webpack111"], " ");

  // 将图像添加到已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  // 按钮
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
