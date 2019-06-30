<template>
    <div>
        <h1>Product List</h1>
        <img
            v-if="loading"
            src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        >
        <ul v-else>
            <li v-for="product in products">
                {{product.title}} - {{product.price}} - {{product.inventory}}
                <button @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<script>



    export default{
        data() {
            return {
                loading: false
            }
        },

     computed:{
         products(){
             return this.$store.getters.availableProducts
         }
       }, 

       methods: {
           addProductToCart(product){
               this.$store.dispatch('addProductToCart', product)
           }
       },

       created(){
           this.loading = true;
           //passing action and payload(if any)
           this.$store.dispatch('fetchProducts')
           .then(() => this.loading = false)
       }
    }
</script>


<style scoped>

</style>