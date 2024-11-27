import _ from "lodash";
import "./assets/styles/global-scss.scss";
console.log(_.join([12, 324]));
ProvidePluginApi.useLodash(); // webpack 注入的

export default function printMe() {
  console.log(111);
  let a = 110;
  if (a > 1) {
    console.log(a);
  }

  console.log("I get called from print.js!");
}

async function name() {
  console.log(11);
}

name();
