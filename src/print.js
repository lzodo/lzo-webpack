import _ from "lodash";
import { useLodash } from "./utils/tool";
console.log(_.join([12, 34]));
useLodash();

export default function printMe() {
  console.log(111);

  console.log("I get called from print.js!");
}
