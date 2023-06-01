class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
                
            </div>
        `;
        productList.appendChild(element);
    }

    restForm() {
        document.getElementById('product-form').reset();
    }


    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Product deleted successfully', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(() => {document.querySelector('.alert').remove();}, 2000 );
    }
}

// DOM events
document.getElementById("product-form")
    .addEventListener("submit", (e) => {
        const name = document.getElementById('name').value
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        console.log(name, price, year);

        const product = new Product(name, price, year);
        console.log(product)

        const ui = new UI();
        if(name === '' || price === '' || year === '') {
            return ui.showMessage('Complete fields pleas', 'danger');
        }
        ui.addProduct(product);
        ui.restForm();
        ui.showMessage('Product added successfully', 'success');

        e.preventDefault();
    })

document.getElementById('product-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target);
})