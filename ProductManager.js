const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
        this.format = 'utf-8'
    }

    getNextId =  async () =>{
        const products = await this.getProducts();
        const count = products.length;
        return count > 0 ? products[count-1].id + 1 : 1;
    }

    validarCode2 = (code) =>{
        let products = this.getProducts();
        console.log(products.length);
    }

    getProductById = async (id) =>{
        const producto = await this.getProducts();
        const productoById = producto.find(product => product.id === id)
        if(productoById == undefined){
            return console.log("Not found!!!");
        } else{ 
            return productoById;
        }
    }

    updateProduct = async (id, campoActualizar, nuevoCampo) =>{
        const producto = await this.getProducts();
        const obj = producto.find(product => product.id === id)
        if (obj == undefined ){
            return console.log("Ingrese un id a modificar valido!");
        }else if (campoActualizar == id){
            return console.log("El campo id no se puede modificar!");
        } else{
            obj[campoActualizar]= nuevoCampo;
            fs.writeFileSync(this.path, JSON.stringify(producto));
        }
    }


    validarCode = async (code) =>{
        let products = await this.getProducts();
        const productCode = products.find(producto=> producto.code == code)
        if (productCode != undefined){
                console.log("ERROR!!!! El Codigo " +  code + " esta repetido!!!");
                return false;
            } else if(productCode == undefined){
                return true;
            }
        }

    validarCampos = async (title, description, price, thumbnail, code, stock) =>{
        if(title== undefined || title=="" || description == undefined || description == "" || price == undefined ||price == "" || thumbnail== undefined || thumbnail== "" || code== undefined || code== "" || stock == undefined || stock == ""){
            console.log("ERROR,Faltan campos por completar!")
            return false;
        }else{
            return true;
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock, ) => {
        const id = await this.getNextId();
        if((this.validarCode(code)) && (this.validarCampos(title, description, price, thumbnail, code, stock))){
            return this.getProducts()
            .then(products => {
                products.push({
                    id: id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,    
                })
                return products;
            })
            .then(productsNew => fs.promises.writeFile(this.path, JSON.stringify(productsNew)))
        }
    }

    getProducts = async () => {
        return fs.promises.readFile(this.path, this.format)
            .then(products => JSON.parse(products))
            .catch(e => {
                console.log('ERROR', e);
                return []
            })
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const filter = products.filter(prod => prod.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(filter))

    }

}

async function run() {
    const manager = new ProductManager('productos.json')
    //await manager.addProduct("Producto numero 1", "Esta es la descripcion del producto 1", 200, "FotoProduct2.jpg", 7, 1)
    await manager.deleteProduct(3);
    //await manager.updateProduct(3, "code", 9)
    console.log( await manager.getProducts() );
    //console.log(await manager.getProductById(1))
   // await console.log( await manager.getProductById(2));
}

run()