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
        if(title== undefined || title=="" || description == undefined || description == "" || price == undefined ||price == "" || thumbnail== undefined || thumbnail== "" || code== undefined || code== "" || stock == undefined || stock == ""){
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

const manager = new ProductManager ()

manager.addProduct("Producto numero 1", "Esta es la descripcion del producto 1", 100, "FotoProduct1.jpg", 1)
manager.addProduct("Producto numero 2", "Esta es la descripcion del producto 2", 200, "FotoProduct2.jpg", 2, 2)

console.log(manager.products);