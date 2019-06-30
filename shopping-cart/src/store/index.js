import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // Store has five properties, state, mutation, getters, actions and modules
    state: { //equivalent to data
        products: []
    },

    getters: { // equivalent to computed properties
        productsCount () {
            //could return the length or an array ...
            //mostly used to calculate or filter things at runtime
        }
    },

    actions:{
        //equivalents to actions
        fetchProducts(){
            //make an api call to feed the products
            // run setProducts mutation(call the mutation that sets the products)

        }
    },

    mutations: {
        // responsible for setting and updating state
        // passes state and payload,here product is our payload
        setProducts(state, products){
            // update products
            state.products = products
        }
    }

})