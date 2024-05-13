// * HtmlElements and variables 
let input = document.querySelector(".INPUT");
let btn = document.querySelector(".button");
let close = document.querySelector(".close");
let model = document.querySelector(".model");
let update = document.querySelector(".update_btn");
let inputUpdate = document.querySelector(".input_update");
let new_data = document.querySelector(".new_data");
let item = document.querySelector(".item");
let tbody_container = document.querySelector(".tbody");
let clear = document.querySelector(".clear");
let datas = JSON.parse(localStorage.getItem("data")) || [];
let links = document.querySelectorAll(".links a");
let All = [/* array of all items */];
let Active = [/* array of active items */];
let Completed = [/* array of completed items */];
let isCompletedFilterActive = false;
// * if he has d-none give him line-through 
// * Function 
displayDataAll();
itemLeft();
// ? function Active
// ~ tasks 
// Sample data

// Flag to indicate if the "Completed" filter is active


// Add event listener to the checkbox outside of displayData function

// Update the "Completed" filter flag in the event listener for the links

// ~ for Each 

// Add event listener to the checkbox outside of displayData function

// * function 
function check() {
    for (let i = 0; i < datas.length; i++) {
        if (datas[i].checked) {
            let checkbox = document.querySelector(`input[data-index="${i}"]`);
            let h4 = checkbox.closest(".new_data").querySelector("h4");
            h4.classList.add("line-through");
            checkbox.classList.add("hidden");
        }
    }
}
function clearInput() {
    input.value = "";
}
function itemLeft() {
    let newArray = datas.filter(data => !data.checked);
    item.innerHTML = newArray.length;
}
function displayDataAll(ar) {
    tbody_container.innerHTML = "";
    for (let i = 0; i < datas.length; i++) {
        displayData(i,ar);
    }
    check(); // Call check function to add the class after loading data
}

function deleteData(index) {
    datas.splice(index, 1);
    tbody_container.innerHTML = "";
    displayDataAll();
    localStorage.setItem("data", JSON.stringify(datas));
    itemLeft()
}

function updateData(index) {
    model.classList.remove("hidden");
    update.addEventListener("click", function () {
        if (inputUpdate.value !== null) {
            datas[index].words = inputUpdate.value;
            tbody_container.innerHTML = "";
            displayDataAll();
            localStorage.setItem("data", JSON.stringify(datas));
            model.classList.add("hidden");
        }
    });
}
function displayData(index, ar = datas) {
    let textHtml = `
        <tr class="flex justify-between p-3 border-b-2 rounded-md items-center">
          <td>
            <div class="flex gap-1 new_data justify-center items-center">
              <span class="flex  justify-center items-center"><input type="checkbox" data-index="${index}" onclick="itemLeft()" class="checkbox checkbox-xs" ${ar[index].checked ? 'checked' : ''}/> </span>
              <h4 class="pb-1 ">${ar[index].words}</h4>
            </div>
          </td>
          <td>
            <div>
              <span onclick="updateData(${index})" class="transition-all  text-2xl duration-300 hover:text-yellow-500 hover:opacity-100 opacity-40"><i _ngcontent-ng-c2008031352="" class=" fa-solid fa-pen-to-square  cursor-pointer ms-1 "></i></span>
              <span  onclick="deleteData(${index})" class="transition-all text-2xl duration-300 hover:text-red-500 hover:opacity-100 opacity-40"><i _ngcontent-ng-c2008031352="" class="fa-solid fa-trash-alt  cursor-pointer ms-1 "></i></span>
            </div>
          </td>
        </tr>
    `;
    tbody_container.innerHTML += textHtml;
    itemLeft()
}
// * Event 
btn.addEventListener("click", function () {
    if (input.value === "") { 
        alert("Error")
    } else {
        let note = {
            words: input.value,
            checked: false
        };
        datas.push(note);
        localStorage.setItem("data", JSON.stringify(datas));
        displayData(datas.length - 1);
        clearInput();
    }
});
links.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default behavior of the link

        // Remove the 'active' class from all links
        links.forEach(link => {
            link.classList.remove("active");
        });

        // Add the 'active' class to the clicked link
        link.classList.add("active");

        // Reset the "Completed" filter flag
        isCompletedFilterActive = false;

        // Filter the data based on the clicked link directly from 'datas'
        if (link.innerHTML === "All") {
            displayDataAll(datas);
            itemLeft();
        }
        if (link.innerHTML === "Active") {
            let Active = datas.filter(data => !data.checked);
            tbody_container.innerHTML = "";
            displayDataAll(Active);
            itemLeft();
        }
        if (link.innerHTML === "Completed") {
            isCompletedFilterActive = true; // Set the "Completed" filter flag
            let Completed = datas.filter(data => data.checked);
            
            tbody_container.innerHTML = "";
            console.log(Completed);
            displayDataAll(Completed);
            
            //  item.innerHTML = 0; // Update item count to reflect completed items
        }
    });
});
tbody_container.addEventListener("change", function (e) {
    if (e.target.classList.contains("checkbox")) {
        let index = e.target.dataset.index;
        let h4 = e.target.closest(".new_data").querySelector("h4");
        
        // Update display only if the "Completed" filter is not active
        if (!isCompletedFilterActive) {
            datas[index].checked = e.target.checked;
            localStorage.setItem("data", JSON.stringify(datas));
        }
        


        if (e.target.checked || ar[index].checked ==='checked' ) {
            h4.classList.add("line-through");
            e.target.classList.add("hidden");
        } else {
            h4.classList.remove("line-through");
        }
        itemLeft(); // Call itemLeft() after updating datas
    }
});
close.addEventListener("click", function () {
    model.classList.add("hidden");
});
// ~ 1- clear complete
clear.addEventListener("click", function () {
    // Filter out checked items
    datas = datas.filter(data => !data.checked);
        itemLeft()
    // Update local storage and display
    localStorage.setItem("data", JSON.stringify(datas));
    tbody_container.innerHTML = "";
    displayDataAll();
});