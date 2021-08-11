import { runShellCommand } from "./cmd.telefunc";

const buttonEls = document.querySelectorAll("button.cmd");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const resultEl = document.querySelector("#result");

async function run() {
  const cmd = inputEl.value;
  const result = await runShellCommand(cmd);
  resultEl.textContent = result;
}

buttonEls.forEach((buttonEl) => {
  buttonEl.onclick = () => {
    const cmd = buttonEl.textContent;
    inputEl.value = cmd;
    run();
  };
});

formEl.onsubmit = (ev) => {
  ev.preventDefault();
  run();
};
