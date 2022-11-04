import _ from "lodash";
import { dailyUpdate } from "./scripts/dailyUpdate";
import { header } from "./scripts/header";
import { current } from "./scripts/current";
import "./styles.css";

header.onPageLoad();
current.onPageLoad();
dailyUpdate.onPageLoad();

function component() {
  const element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
