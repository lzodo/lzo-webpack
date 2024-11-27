import _ from "lodash";
// import { createApp } from "../node_modules/vue/dist/vue.esm-browser"; //这个才能直接用 template
import { createApp } from "vue";
import App from "./App";
import "./assets/styles/global.css";
import "./assets/styles/global-less.less";
import "./assets/styles/global-scss.scss";
import "./assets/styles/b.module.less";
import Icon from "./assets/images/1.jpg";
import printMe from "./print.js";
import "@/utils/testhot";

createApp(App).mount(document.querySelector("#app"));
// {
//   template: "<div>{{msg}}</div>",
//   data() {
//     return {
//       msg: "8ddd",
//     };
//   },
// }

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // 测试第三方库
  element.innerHTML = _.join(["Hello", "webp"], " ");

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

// 热跟新配置
if (module.hot) {
  module.hot.accept("./utils/testhot.js", function () {
    console.log("额外做一些事情");
  });
}
