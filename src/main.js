const productData = () => {
    return {
        products: [],
        categories: [],
        loading: true,
        error: null,

        init() {
            this.fetchProducts();
            this.fetchCategories();
        },

        async fetchProducts() {
            try{
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error(
                        "Data fetching failed, please check your network connection"
                    )
                }
                const data = await response.json();
                console.log(data)
                this.products = data;
            } catch (err) {
               this.error = err;
               this.loading = false;
            } finally {
                this.loading = false;
            }
        },

        async fetchCategories() {
            try{
                const response = await fetch("https://fakestoreapi.com/products/categories");       
                if (!response.ok) {
                    throw new Error(
                        "Data fetching failed, please check your network connection"
                    ) 
                }
                const data = await response.json();
                console.log(data)
                this.categories = data;
                this.loading = false;

            } catch(err) {
                this.error = err;
                this.loading = false;
            }
        }
    }
}