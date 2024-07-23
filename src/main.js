const productData = () => {
    return {
        products: [],
        filteredProducts: [],
        categories: [],
        loading: true,
        error: null,
        showModal: false,
        modalProduct: {},
        sortOption: 'default',
        filterOption: 'All categories',


        init() {
            this.fetchProducts(this.filterOption);
            this.fetchCategories();

            this.$watch('filterOption', (category) => {
                this.fetchProducts(category);
            });

            document.addEventListener('category-changed', (event) => {
                const category = event.detail;
                this.filterOption = category;
                this.fetchProducts(category);
            });
        },

        async fetchProducts(category) {
            try{
                let url = "https://fakestoreapi.com/products"
                if (category && category !== 'All categories') {
                    url = `https://fakestoreapi.com/products/category/${category}`
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        "Data fetching failed, please check your network connection"
                    )
                }
                console.log(url)
                const data = await response.json();
                console.log(data)
                this.products = data;
                this.filteredProducts = this.product;
                this.applyFilters();
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
        },

        applyFilters() {
            let filtered = this.products

            if (this.sortOption === 'low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (this.sortOption === 'high') {
                filtered.sort((a,b) => b.price - a.price)
            }

            this.filteredProducts = filtered;
        },

        selectCategory(category) {
            this.filterOption = category;
            console.log(this.filterOption)
            this.fetchProducts(category);
        },

        sortProducts() {
            if (this.sortOption === 'default') {
                this.fetchProducts(this.filterOption);
            } else {
                this.applyFilters();
            }
            
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
                this.categories = await response.json();
            } catch (error) {
                this.error = 'Failed to fetch categories';
            }
        },

        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },

        selectCategory(category) {
            this.filterOption = category;
            this.$dispatch('category-changed', category)
            console.log(this.filterOption)
        }
    }
}
    
