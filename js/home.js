document.querySelector("#sidebar-toggle").onclick = () => document.body.classList.toggle("menu-open");
const elements = document.querySelectorAll("#products > *"),
  nElements = Math.floor(document.documentElement.clientWidth / 325) - 1 < 0  ? 0 : Math.floor(document.documentElement.clientWidth / 325) - 1,
  previous = document.querySelector("#previous-product"),
  next = document.querySelector("#next-product");
var left = 0;
function setCSS(e) { for (elements.forEach((e) => e.setAttribute("class", "hidden")), i = e; i <= e + nElements; i++) elements[i].setAttribute("class", "view") };
setCSS(0),
  nElements >= elements.length - 1 && ((previous.style.display = "none"), (next.style.display = "none")),
  (previous.onclick = () => left > 0 && setCSS(--left)),
  (next.onclick = () => left + nElements < elements.length - 1 && setCSS(++left));