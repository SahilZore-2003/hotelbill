let data = [
  {
    id: "jfhgbvnscs",
    name: "Shejwan Rice",
    price: 120,
    img: "images/img-1.jpg",
    category: "rice"
  },
  {
    id: "ioytrhndcv",
    name: "Chicken lolipop",
    price: 250,
    img: "images/img-2.jpg",
    category: "starter"
  },
  {
    id: "wuefbncxbsn",
    name: "Paneer Chilli",
    price: 180,
    img: "images/img-3.jpg",
    category: "starter"
  },
  {
    id: "thyfhcbcv",
    name: "Hakka Noodles",
    price: 150,
    img: "images/img-4.jpg",
    category: "noodles"
  },
  {
    id: "thiecbawdjksadjk",
    name: "Chicken Chilli",
    price: 220,
    img: "images/img-5.jpg",
    category: "starter"
  },
  {
    id: "iuertrywebncdjksadjk",
    name: "Prawns Fry",
    price: 200,
    img: "images/img-6.png",
    category: "starter"
  },
  {
    id: "thierytbvcbvzdhadjk",
    name: "Chicken Fry",
    price: 280,
    img: "images/img-7.png",
    category: "starter"
  },
  {
    id: "trfoiwfcnbcawdjksadjk",
    name: "Fried Rice",
    price: 120,
    img: "images/img-8.png",
    category: "rice"
  },
  {
    id: "cbvxbcvsceldk",
    name: "Chowmin Noodels",
    price: 140,
    img: "images/img-9.png",
    category: "noodels"
  },
  {
    id: "oiopijmjkhuihb",
    name: "Manchawn Soup",
    price: 80,
    img: "images/img-10.png",
    category: "soup"
  },
  {
    id: "oiopijewyiohbjhib",
    name: "Chicken Crispy",
    price: 200,
    img: "images/img-11.png",
    category: "starter"
  },
  {
    id: "rtytytuyuytyytbvncv",
    name: "Special Biryani",
    price: 250,
    img: "images/img-12.png",
    category: "biryani"
  },
];



function startApp() {


  data.forEach((e, index) => {

    container.innerHTML += `
   <div class="item" >
   <div class="img-container">
   <img src="${e.img}" alt="">
   </div>
   <div class="content">
   <h3>${e.name}</h3>
   <div  class="flex">
       <h1>₹ ${e.price}</h1>
       <div>
           <button onclick="decrement('${e.id}')" class="dec">-</button>
           <span class="quntity" id="${e.id}">0</span>
           <button onclick="increment('${e.id}')" class="inc">+</button>
       </div>
   </div>
   </div>
</div>
   `
  })

}

startApp()

// filter function 

let tabsbtns = document.querySelectorAll("#tabs button");
tabsbtns.forEach((e) => {
  e.addEventListener("click", () => {
    tabsbtns.forEach((e) => {
      e.classList.remove("activetab")
    })
    e.classList.add("activetab");
  })

})

function filteritems(filteritem) {

  if (filteritem === "all") {
    container.innerHTML = "";
    startApp()
  } else {
    let filtered = data.filter((e) => {
      return e.category === filteritem;
    })

    container.innerHTML = "";

    filtered.forEach((e) => {

      container.innerHTML += `
       <div class="item" >
       <div class="img-container">
       <img src="${e.img}" alt="">
       </div>
       <div class="content">
       <h3>${e.name}</h3>
       <div  class="flex">
           <h1>₹ ${e.price}</h1>
           <div>
               <button onclick="decrement('${e.id}')" class="dec">-</button>
               <span class="quntity" id="${e.id}">0</span>
               <button onclick="increment('${e.id}')" class="inc">+</button>
           </div>
       </div>
       </div>
    </div>
       `
    })
  }


}


// filter function ends 

let basket = []


let increment = (id) => {

  let selectitem = data.find((x) => {
    return x.id === id;
  })

  let search = basket.find(x => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
      name: selectitem.name,
      price: selectitem.price
    })
  } else {
    search.item += 1
  }
  update()

}
let decrement = (id) => {


  let search = basket.find(x => x.id === id);
  if (search.item === 0) {
    return;
  }
  else {
    search.item -= 1
  }

  update()

}



function update() {
  basket.forEach((e) => {
    document.getElementById(e.id).innerText = e.item;
  })
}



let billnumber = Math.floor(Math.random() * 9999);
let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let today = `${day}-${month}-${year}`;

let hours = new Date().getHours();
let miniute = new Date().getMinutes();
let time = `${hours}:${miniute}`;
if (hours > 12) {
  time = time + " PM"
} else {
  time = time + " AM"
}
let waitername = localStorage.getItem("waiter");


document.getElementById("gototop").addEventListener("click", () => {

  let billhtml = "";

  basket.forEach((e) => {
    billhtml += `
    <tr>
          <th>${e.name}</th>
          <th>${e.item}</th>
          <th>${e.price}</th>
          <th class="totalbill">${eval(e.price * e.item)}</th>
      </tr>
    `;
  })

  let total = 0;
  basket.forEach((e) => {
    total += e.price * e.item;
  })


  // bill html 

  document.getElementById("invoice").innerHTML += `
  <h1 class="center">Food</h1>
  <p class="address center">
      A/14 old dombivali near khandoba mandir Dombivali (West), 421202 <br>
      <b>Phone:</b> 9356089857
  </p>
  <hr>
  <div class="bill-details">
      <h4>Bill Details: ${billnumber}</h4>
      <h4 id="date">Date:- ${today} </h4>
      <h4 id="time">Time:- ${time}</h4>
      <h4 id="waiter">Waiter: ${waitername || ""}</h4>
  </div>
  <hr>
  <table>
      <tr>
          <th>Item Name</th>
          <th>Qnt</th>
          <th>Rate</th>
          <th>Total</th>
      </tr>
      <tbody>
       ${billhtml}
      </tbody>
      
  </table>
  <h3 class="center" id="totalbill">Total: ${total}</h3>
  <div class="billqr">
      <img src="images/paymentqr.jpg" alt="">
  </div>
  <small class="center">Thank's Visit again...</small>
  <div class="billbuttons">
    <i class="fa-regular fa-circle-left" id="hidebill"></i>
    <i class="fa-regular fa-file-powerpoint" id="printbill"></i>
  </div>

  `

  document.getElementById("hidebill").addEventListener("click", () => {
    window.location.reload()
  })
  document.getElementById("printbill").addEventListener("click", () => {
    var printContents = document.getElementById("invoice").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  })
  document.getElementById("invoice").style.display = "block"
})



document.getElementById("changewaiter").addEventListener("click", () => {
  waitername = prompt("enter waiter name");
  localStorage.setItem("waiter", waitername);
})


