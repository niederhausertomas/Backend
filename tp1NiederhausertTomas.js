class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts = () => {return this.products}
    getNextId = () =>{
        const count = this.products.length
        if(count>0){
            const lastProduct = this.products[count-1]
            const id = lastProduct.id + 1;
            return id;
        } else {
            return 1;
        }
    }

    validarCode = (code) =>{
        const producto = this.products.find(producto => producto.code === code)
        if(producto == undefined){
            return true;
        } else if(producto != undefined){ 
            console.log("ERROR!!!! El Codigo " +  code + " esta repetido!!!");
            return false;
        }
    }

    validarCampos = (title, description, price, thumbnail, code, stock) =>{
        if(title== (undefined||"") || description==(undefined||"") || price==(undefined||"") || thumbnail==(undefined||"") || code==(undefined||"")|| stock==(undefined||"")){
            return false;
        }else{
            return true;
        }
    }

    getProductById = (id) =>{
        const producto = this.products.find(producto => producto.id === id)
        if(producto == undefined){
            return console.log("Not found!!!");
        } else{ 
            return producto;
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if(this.validarCode(code)&& this.validarCampos(title, description, price, thumbnail, code, stock)){
        const product ={
            id: this.getNextId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(product)}
    }
}

const productManager = new ProductManager()


productManager.addProduct ("manzana", "fruta", 10, "./imagenes/imagenes1.jpg", 1, 20);
productManager.addProduct ("tomate", "fruta", 5, "./imagenes/imagenes2.jpg", 2, 10);
productManager.addProduct ("pera", "verdura", 5, "./imagenes/imagenes2.jpg", 3, 10);
productManager.addProduct ("papa", "verdura", 5, "./imagenes/imagenes4.jpg", 1, 10);
console.log(productManager.getProductById(8));

console.log(productManager.getProducts()) 