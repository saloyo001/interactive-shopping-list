
let items = JSON.parse(localStorage.getItem("items")) || [];

const form = document.getElementById("shopping-form");
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clear-btn");
const totalCost = document.getElementById("total-cost");

function showItems() {
    grid.innerHTML = "";
    let total = 0;

    items.forEach(function(item, index) {
        let div = document.createElement("div");

        let text = document.createElement("p");
        text.textContent = item.name + " - " + item.price;

        if (item.purchased) {
            text.style.textDecoration = "line-through";
            total += item.price;
        }

        let buyBtn = document.createElement("button");
        buyBtn.textContent = "Purchased";

        buyBtn.onclick = function() {
            item.purchased = !item.purchased;
            showItems();
        };
 
        

        div.append(text, buyBtn);
        grid.appendChild(div);
    });

    totalCost.textContent = "Total purchased: " + total.toFixed(2);

    localStorage.setItem("items", JSON.stringify(items));
}

form.onsubmit = function(event) {
    event.preventDefault();

    items.push({
        name: nameInput.value,
        price: Number(priceInput.value),
        purchased: false
    });

    form.reset();
    showItems();
};

clearBtn.onclick = function() {
    items = [];
    showItems();
};

showItems();
