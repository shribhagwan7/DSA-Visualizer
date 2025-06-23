const SortDiv = document.getElementById('div-pillors');
const ArraySize = document.getElementById('size');
const Generate = document.getElementById('generate');
const Order = document.getElementById('order');
const Algorithm = document.getElementById('algorithm');
const Reset = document.getElementById('reset');

ArraySize.value = 10; // Default size
let length = parseInt(ArraySize.value, 10);
let arr = [];

Reset.addEventListener('click', ()=>{
    location.reload();  
});

Generate.addEventListener('click', () => {
    length = parseInt(ArraySize.value, 10);
    generateArrayAndCards();

    if(Algorithm.value === 'Bubble-Sort'){
        if (Order.value === 'ascending') {
            bubbleSortVisualization();
        }
        else if (Order.value === 'descending') {
            bubbleSortVisualizationDescending();
        }
    }
});

function generateArrayAndCards() {
    SortDiv.innerHTML = ''; 
    arr = []; 

    // new random array
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 50));
    }

    updateCards();
}

function sortBars() {
    let bars = Array.from(SortDiv.children); // Get all bars from DOM

    bars.sort((a, b) => {
        let heightA = parseInt(a.style.height); // Extract height from style
        let heightB = parseInt(b.style.height);

        // return Order.value === 'ascending' ? heightA - heightB : heightB - heightA;
        return Order.value === 'descending' ? heightB - heightA : heightA - heightB;
    });

    SortDiv.innerHTML = "";
    bars.forEach(bar => SortDiv.appendChild(bar));
}

function createCard(value) {
    // Create a new div
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = value;

    // dynamic fixed height
    let div_height = 450;
    card.style.height = value === 0 ? "3px" : `${(value / 50) * div_height}px`;

    // append with its parent
    SortDiv.appendChild(card);
}

function updateCards() {
    SortDiv.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        createCard(arr[i]);
    }
}

// Bubble sort

async function bubbleSortVisualization() {
    let bars = Array.from(SortDiv.children);

    function swapDivs(i, j) {
        return new Promise((resolve) => {
            let bar1 = bars[i];
            let bar2 = bars[j];

            bar1.style.backgroundColor = "red";
            bar2.style.backgroundColor = "red";

            setTimeout(() => {
                if (arr[i] > arr[j]) {  
                    // swap
                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    // Swap heights
                    [bar1.style.height, bar2.style.height] = [bar2.style.height, bar1.style.height];

                    // Swap text
                    [bar1.textContent, bar2.textContent] = [bar2.textContent, bar1.textContent];

                    // using animation for swapping
                    bar1.style.transition = "transform 0.4s ease";
                    bar2.style.transition = "transform 0.4s ease";
                    bar1.style.transform = "translateX(30px)";
                    bar2.style.transform = "translateX(-30px)";

                    setTimeout(() => {
                        bar1.style.transform = "translateX(0)";
                        bar2.style.transform = "translateX(0)";

                        // Swap actual divs in the DOM
                        SortDiv.insertBefore(bar2, bar1.nextSibling);
                        bars = Array.from(SortDiv.children); // Update bars array
                    }, 500);
                }

                // Reset color
                setTimeout(() => {
                    bar1.style.backgroundColor = "blue";
                    bar2.style.backgroundColor = "blue";
                    resolve(); // Continue sorting after swap
                }, 500);

            }, 600);
        });
    }

    async function sortBars() {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                await swapDivs(j, j + 1);
            }
            bars[arr.length - 1 - i].style.backgroundColor = "green"; 
        }
        bars[0].style.backgroundColor = "green";
    }

    sortBars();
}

async function bubbleSortVisualizationDescending() {
    let bars = Array.from(SortDiv.children);

    function swapDivs(i, j) {
        return new Promise((resolve) => {
            let bar1 = bars[i];
            let bar2 = bars[j];

            bar1.style.backgroundColor = "red";
            bar2.style.backgroundColor = "red";

            setTimeout(() => {
                if (arr[i] < arr[j]) {  
                    // swap
                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    // Swap heights
                    [bar1.style.height, bar2.style.height] = [bar2.style.height, bar1.style.height];

                    // Swap text
                    [bar1.textContent, bar2.textContent] = [bar2.textContent, bar1.textContent];

                    // using animation for swapping
                    bar1.style.transition = "transform 0.4s ease";
                    bar2.style.transition = "transform 0.4s ease";
                    bar1.style.transform = "translateX(30px)";
                    bar2.style.transform = "translateX(-30px)";

                    setTimeout(() => {
                        bar1.style.transform = "translateX(0)";
                        bar2.style.transform = "translateX(0)";

                        // Swap actual divs in the DOM
                        SortDiv.insertBefore(bar2, bar1.nextSibling);
                        bars = Array.from(SortDiv.children); // Update bars array
                    }, 500);
                }

                // Reset color
                setTimeout(() => {
                    bar1.style.backgroundColor = "blue";
                    bar2.style.backgroundColor = "blue";
                    resolve(); // Continue sorting after swap
                }, 500);

            }, 600);
        });
    }

    async function sortBars() {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                await swapDivs(j, j + 1);
            }
            bars[arr.length - 1 - i].style.backgroundColor = "green"; 
        }
        bars[0].style.backgroundColor = "green";
    }

    sortBars();
}

generateArrayAndCards();






