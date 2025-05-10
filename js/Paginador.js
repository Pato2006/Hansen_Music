document.addEventListener("DOMContentLoaded", function(event) { 
   //renderButtons();
});

let currentPage = 1;
const maxPages = 20; // Cambiado a 20 como maxiimoooo
let historyStack = [];

function renderButtons() {
  const buttonsDiv = document.getElementById('buttons');
  buttonsDiv.innerHTML = '';

  let startPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  let endPage = Math.min(startPage + 2, maxPages);

  if (currentPage > 1) {
    const button = document.createElement('button');
    button.textContent = 1;
    button.onclick = function () {
      changePage(1);
    };
    buttonsDiv.appendChild(button);
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.onclick = function () {
      changePage(i);
    };
    buttonsDiv.appendChild(button);
  }
}

function changePage(pageNumber) {
  if (pageNumber !== currentPage) {
    historyStack.push(currentPage);
    currentPage = pageNumber;
    renderButtons();
  }
}

function nextPage() {
  if (currentPage < maxPages) {
    if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== currentPage) {
      historyStack.push(currentPage);
    }
    currentPage += 1;
    renderButtons();
  }
}

function previousPage() {
  if (historyStack.length > 0) {
    currentPage = historyStack.pop();
  } else {
    currentPage = 1;
  }
  renderButtons();
}

function goToFirstPage() {
  currentPage = 1;
  historyStack = [];
  renderButtons();
}
