// console.log("connected")
const cardContainer = document.getElementById("card-container");
const allTabBtn = document.getElementById("all-btn");
const openTabBtn = document.getElementById("open-btn");
const closedTabBtn = document.getElementById("close-btn");
const cardCount = document.getElementById("card-count");
const loadingSpinner = document.getElementById("loading-spinner");
const cardDetailModal =document.getElementById("card-detail-modal")


// loadingSpinner
function loadingActive() {
    loadingSpinner.classList.remove("hidden")
    cardContainer.innerHTML = " ";
    console.log(loadingSpinner)
}
function loadingRemove() {
    loadingSpinner.classList.add("hidden");
    console.log(loadingSpinner);
}

// load all card
async function loadAllCard() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data)
    displayCard(data.data);
}
loadAllCard()

function displayCard(cards) {
    console.log(cards);
    loadingActive()
    cardContainer.innerHTML = " ";

    cards.forEach(card => {

        const cardDiv = document.createElement("div");
        if (card.status == "open") {
            cardDiv.className = "card border-green-400 border border-t-4 border-t-green-600 shadow-sm ";
        } else {
             cardDiv.className = "card border-purple-400 border border-t-4 border-t-pruple-900 shadow-sm ";
        }

        const priorityClass = card.priority == "high" ? "badge-error" : card.priority == "low" ? "bg-gray-400 text-white" : "badge-warning";

        cardDiv.innerHTML = `
            
                <div onclick="openModal(${card.id})" class="card-body space-y-1">
                    <div class="flex  justify-between">
                        <div class="flex ">
                            ${card.status == "open"? `<img src="./assets/Open-Status.png" alt="">`: `<img src="./assets/Closed- Status .png" alt="">`}
                        </div>
                        <div class="badge  badge-outline   ${priorityClass}">${card.priority}</div>
                    </div>
                    <div  >
                        <h2 class="card-title">${card.title}
                        </h2>
                        <p class="line-clamp-2 text-gray-700">${card.description}</p>
                        <div class="card-actions justify-start my-2">
                        <div class="badge bg-red-100 badge-outline badge-error">${card.labels[0] == "bug"? ` <i class="fa-solid fa-bug"></i>`: card.labels[0] == "enhancement"?`<i class="fa-solid fa-rocket"></i>`: `<i class="fa-brands fa-readme"></i>`}  ${card.labels[0]}</div>
                        ${card.labels[1] ? `
                        <div class="badge badge-outline bg-amber-50 badge-warning">
                        <img src="./assets/vector.png" alt="">
                        ${card.labels[1]}
                        </div>` : ""}
                        </div>
                    </div>
                     <div class="border-t border-gray-300 pt-4 text-gray-700 space-y-2 text-base">
                        <p >#${card.id} ${card.author}</p>
                        <p>${new Date(card.createdAt).toLocaleDateString()}</p>
                     </div>
                </div>      
        `
        cardCount.textContent = cards.length;
        cardContainer.appendChild(cardDiv);
        loadingRemove()
    });
}


// open issues
async function openIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const allIssues = data.data;
    // console.log(allIssues);
        const filterOpenCard = allIssues.filter(issue => issue.status == "open");      
    displayCard(filterOpenCard);
    cardCount.textContent = filterOpenCard.length;
}

// closed issues

async function closedIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const allIssues = data.data;
    // console.log(allIssues);
        const filterClosedCard = allIssues.filter(issue => issue.status == "closed");      
    displayCard(filterClosedCard);
    cardCount.textContent = filterClosedCard.length;
}

// toggle tabs button
//   open tab
 openTabBtn.addEventListener("click", function () {    
        cardContainer.innerHTML = " ";
        openIssue();
        allTabBtn.classList.remove("btn-primary");
        closedTabBtn.classList.remove("btn-primary");
         openTabBtn.classList.add("btn-primary");
})
 
function togglebtn(id) {
    cardContainer.innerHTML = " ";
    const selectedBtn = document.getElementById(id);
    if (selectedBtn == openTabBtn) {
        loadingActive()
     allTabBtn.classList.remove("btn-primary");
    closedTabBtn.classList.remove("btn-primary");
        openTabBtn.classList.add("btn-primary");
        openIssue(); 
        loadingRemove()
    }
    if (selectedBtn == closedTabBtn) {
        loadingActive()
     allTabBtn.classList.remove("btn-primary");
    closedTabBtn.classList.add("btn-primary");
        openTabBtn.classList.remove("btn-primary");
        closedIssue();
        loadingRemove();
    }
    else {
        loadingActive()
        allTabBtn.classList.add("btn-primary");
    closedTabBtn.classList.remove("btn-primary");
        openTabBtn.classList.remove("btn-primary");
        cardContainer.innerHTML = " ";
        loadAllCard();
        loadingRemove();
    }

}


// card detail modal 
const openModal = async(id) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const details = await res.json();
    console.log(details.data);
    const card = details.data;
    const priorityClass = card.priority == "high" ? "badge-error" : card.priority == "low" ? "bg-gray-600 text-white" : "badge-warning";
    const statusClass = card.status == "open" ? "badge-success" : "badge-primary";
    console.log(card.labels)
    
    cardDetailModal.innerHTML = `
        <div class="modal-box">
        <h3 class="text-lg font-bold mb-2">${card.title}</h3>
        <div class="flex gap-3 ">
        <span class=" badge ${statusClass}">${card.status}</span> <span>  • Opened by ${card.assignee}</span>  <span>• ${new Date(card.updatedAt).toLocaleDateString()}</span>
        </div>

         <div class="card-actions justify-start my-5">
                        <div class="badge bg-red-100 badge-outline badge-error">${card.labels[0] == "bug"? ` <i class="fa-solid fa-bug"></i>`: card.labels[0] == "enhancement"?`<i class="fa-solid fa-rocket"></i>`: `<i class="fa-brands fa-readme"></i>`}  ${card.labels[0]}</div>
                        ${card.labels[1] ? `
                        <div class="badge badge-outline bg-amber-50 badge-warning">
                        <img src="./assets/vector.png" alt="">
                        ${card.labels[1]}
                        </div>` : ""}
                        </div>
        <p class="py-4">${card.description}</p>

        <div class="bg-gray-100 p-4 grid grid-cols-2 justify-start rounded">
            <div >
              <p>Assignee:</p>
              <p class="font-bold">${card.assignee}</p>
            </div>
            <div>
              <p class="text-gray-600">Priority:</p>
              <div class="badge  text-white  ${priorityClass}">${card.priority}</div>
            </div>
        </div>
        <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
        </form>
        </div>
    </div>
    `
    cardDetailModal.showModal()
}

document.getElementById("search-btn").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue);
    
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
  .then(res => res.json())
  .then(data => {
      const allCard = data.data; // API response er data
      displayCard(allCard);
  })
    
 