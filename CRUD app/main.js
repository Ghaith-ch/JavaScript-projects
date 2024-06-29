document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById('title');
    const price = document.getElementById('price');
    const taxex = document.getElementById('taxex');
    const ads = document.getElementById('ads');
    const discount = document.getElementById('discount');
    const priceInputs = document.querySelectorAll(".price input");
    const totalSpan = document.getElementById('totalSpan');
    const count = document.getElementById('count');
    const category = document.getElementById('category');
    const createButton = document.getElementById('create');
    const tableBody = document.getElementById('tbody');
    const deleteAllDiv = document.getElementById('deleteAll');
    const searchInput = document.getElementById('search');
    const searchByTitleBtn = document.getElementById('searchTitle');
    const searchByCatBtn = document.getElementById('searchCategory');

    let operation = "create";
    let searchBy= "title";
    let tmp;

    let dataProducts = JSON.parse(localStorage.getItem("products")) || [];

    showData();
    
    priceInputs.forEach(input => {
        input.addEventListener('keyup', getTheTotal);
    });

    createButton.addEventListener("click", createTheProduct);

    searchByTitleBtn.addEventListener("click",prepareSearch);

    searchByCatBtn.addEventListener("click",prepareSearch);

    searchInput.addEventListener("keyup",searchData);

    
    function getTheTotal(event) {
            let priceValue = parseFloat(price.value) || 0; 
            let taxexValue = parseFloat(taxex.value) || 0;
            let adsValue = parseFloat(ads.value) || 0;
            let discountValue = parseFloat(discount.value) || 0;

            let result = (priceValue + taxexValue + adsValue) - discountValue;
        
            totalSpan.textContent = priceValue ? result : "Total";
            totalSpan.style.backgroundColor = priceValue ? "#6B8A7A" : "#912626";
    }

    function createTheProduct() {
        let newProduct = {
            title : title.value.toLowerCase(),
            price : price.value,
            taxex : taxex.value,
            ads : ads.value,
            discount : discount.value,
            total : totalSpan.textContent,
            count : count.value,
            category : category.value.toLowerCase()
        }

        if (title.value !="" && price.value !="" && category.value !="" && newProduct.count < 100){

            if (operation === "create"){
                if(newProduct.count > 1){
                    for (let i =0; i < newProduct.count;i++ ){
                        dataProducts.push(newProduct);
                    }
                }else {
                    dataProducts.push(newProduct);
                }
            }else{
                dataProducts[tmp] = newProduct;
                operation = "create";
                count.style.display = "block";
                createButton.textContent = "Create";
            }
            clearInputs();
        }

        localStorage.setItem("products",JSON.stringify(dataProducts));
        showData();
    }

    function clearInputs(){
        title.value = "";
        price.value = "";
        taxex.value = "";
        ads.value = "";
        discount.value = "";
        totalSpan.textContent = "Total";
        totalSpan.style.backgroundColor = "#912626";
        count.value = "";
        category.value = "";
    }

    function showData(){
        let table = "";
        for(let i = 0; i < dataProducts.length; i++ ){

            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxex}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button id="update" data-index="${i}">Update</button></td>
                <td><button id="delete" data-index="${i}">Delete</button></td>
            </tr> `;
        }

        tableBody.innerHTML = table;

        let deleteBtns = document.querySelectorAll ("#delete")
        deleteBtns.forEach(delBtn => {
            delBtn.addEventListener("click", deleteProduct);
        });

        if(dataProducts.length > 0){
            deleteAllDiv.innerHTML = `<button class="deleteAllBtn">Deleta All (${dataProducts.length})</button>`
        }else {
            deleteAllDiv.innerHTML = "";
        }


        let allBtnDelete = document.querySelector (".deleteAllBtn");
        if (allBtnDelete){
            allBtnDelete.addEventListener ("click",function(){
                localStorage.removeItem('products');
                dataProducts.splice(0);
                showData();
            });
        }

        let updateBtns = document.querySelectorAll ("#update")
        updateBtns.forEach(upBtn => {
            upBtn.addEventListener("click", updateProduct);
        });

    }

    function updateProduct(event) {
        const index = event.target.getAttribute("data-index");
        title.value = dataProducts[index].title;
        price.value = dataProducts[index].price;
        taxex.value = dataProducts[index].taxex;
        ads.value = dataProducts[index].ads;
        discount.value = dataProducts[index].discount;
        category.value = dataProducts[index].category;

        getTheTotal();
        count.style.display = "none";
        createButton.textContent = "Update";
        operation = "update";
        tmp = index;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function deleteProduct(event) {
        const index = event.target.getAttribute("data-index");
        dataProducts.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(dataProducts));
        showData();
    }

    function prepareSearch(event) {
        searchBy = event.target.id === "searchCategory" ? "category" : "title";
        searchInput.placeholder = `Search by ${searchBy}`;
        searchInput.value = "";
        searchInput.focus();
        showData();
    }

    function searchData(){
        
        let table = "";
        for(let i = 0 ;i<dataProducts.length; i++) {
            if(dataProducts[i][searchBy].includes(searchInput.value.toLowerCase())){

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProducts[i].title}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].taxex}</td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td>
                        <td>${dataProducts[i].category}</td>
                        <td><button id="update" data-index="${i}">Update</button></td>
                        <td><button id="delete" data-index="${i}">Delete</button></td>
                    </tr> `;   

            }
        }
        tableBody.innerHTML = table;
    }

});

