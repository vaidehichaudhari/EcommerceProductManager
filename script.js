
let products = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", stock: 5 },
  { id: 2, name: "Headphones", price: 200, category: "Electronics", stock: 15 },
  { id: 3, name: "T-shirt", price: 20, category: "Apparel", stock: 50 },
];

function setToLocal(p){
  localStorage.setItem('Procucts', JSON.stringify(p))
}

// function getFromLocal(){
//         productsFromLocal = JSON.parse(localStorage.getItem('Procucts'))
// }

getFromLocal = () => JSON.parse(localStorage.getItem('Procucts'))

// console.log(productsFromLocal);
// console.log(typeof(productsFromLocal))

function renderList(filteredProducts){
  document.getElementById('productList').innerHTML=
  filteredProducts.map((product)=>`<div class="col-md-4">
        <div class="card text-white" style='width:12rem; background-color:#73c2e3'>
          <div class="card-body">
            <h5 class="card-title text-danger">${product.name}</h5>
            <p class="card-text">Category: <span class='text-danger'>${product.category}</span></p>
            <p class="card-text">Price:<span class='text-danger'> ${product.price}</span></p>
            <p class="card-text">Stock: <p class="card-text">Stock:${product.stock}</span></p>
            <button class="btn btn-primary" onclick='deleteProd(${product.id})'>Delete</button>
            <button class="btn btn-primary" onclick='editProd(${product.id})'  data-toggle="modal" data-target="#exampleModal">Edit</button>

          </div>
        </div>
      </div>
      
  `).join('')
}



function addProduct(){
  name1=document.getElementById('name').value
  price=document.getElementById('price').value
  category=document.getElementById('category').value
  stock=document.getElementById('stock').value

  const newProduct =
      { id: Date.now(), name: name1, price: price, category: category, stock: stock }
      console.log(newProduct)
  productsFromLocal.push(newProduct);
  setToLocal(productsFromLocal)
  renderList(getFromLocal())
  
}

filterProducts = ()=>{
  key = document.getElementById('filterKey').value;
  filteredProd = productsFromLocal.filter((p)=> key.toLowerCase() == p.name.toLowerCase())
  console.log(filteredProd);
  renderList(filteredProd);
}
filterByCategary = ()=>{
key = document.getElementById('filterKey').value;
filteredProd = productsFromLocal.filter((p)=> key.toLowerCase() == p.category.toLowerCase())
console.log(filteredProd);
renderList(filteredProd);
}

function deleteProd(ID){
index =  productsFromLocal.findIndex((p)=>p.id==ID)
console.log(index);
productsFromLocal.splice(index,1);
setToLocal(productsFromLocal);
productsFromLocal = getFromLocal();

renderList(productsFromLocal)
}




function editProd(ID){


forUpdate = productsFromLocal.find((p)=> p.id == ID)
console.log(forUpdate);
document.getElementById('updateProd').innerHTML = `<div class="modal-content" >
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
     <div class="form-group">
            <label for="name">Product Name</label>
            
            <input type="text" class="form-control" id="updatedName" value=${forUpdate.name} disabled>
          </div>
          <div class="form-group">
              <label for="name">Product Price</label>
              <input type="text" class="form-control" id="updatedPrice" value=${forUpdate.price}>
          </div>
          <div class="form-group">
              <label for="name">Product Category</label>
              <input type="text" class="form-control" id="updatedCategory" value=${forUpdate.category} disabled>
          </div>
          <div class="form-group">
              <label for="name">Product Stock</label>
              <input type="number" class="form-control" id="updatedStock" value=${forUpdate.stock}>
          </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" onclick='updateProduct(${forUpdate.id})'>Update changes</button>
    </div>
  </div>`
}

function updateProduct(ID){
newPrice = document.getElementById('updatedPrice').value
newStock = document.getElementById('updatedStock').value

console.log(newPrice,newStock)
indexForUpdate = productsFromLocal.findIndex((p)=>p.id == ID)
if(indexForUpdate == -1){
alert('product Not Found')
}else{
console.log(productsFromLocal[indexForUpdate])
productsFromLocal[indexForUpdate].price = newPrice;
productsFromLocal[indexForUpdate].stock = newStock;
setToLocal(productsFromLocal);

productsFromLocal1 = getFromLocal();

renderList(productsFromLocal1)
}

}

setToLocal(products);

productsFromLocal = getFromLocal();

renderList(productsFromLocal)