const productData = () => {
    return {
        products: [],
        categories: [],
        loading: true,
        error: null,
        showModal: false,
        modalProduct: {},

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
                this.loading = false;
            } catch (err) {
               this.error = "Failed to fetch products";
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
        },

        async openModal(product) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${product.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                console.log(data)
                this.modalProduct = data;
                this.showModal = true;
                this.loading = false;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },

        async closeModal() {
            this.showModal = false;
        }
    }
}

const filterData = () => {
    return {
        categories: [],
        filterOption: 'All categories',
        dropdownVisible: false,

        initializeCategories() {
            this.fetchCategories();
        },
    
        async fetchCategories() {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const data = await response.json();
                this.categories = data;
            } catch (error) {
                this.error = 'Failed to fetch categories';
            }
        },

        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        }
    }
}
    
