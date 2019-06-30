import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    // Store has five properties, state, mutation, getters, actions and modules
    state: { //equivalent to data
        products: [],
        //[id, quantity]
        cart: []
    },

    getters: { // equivalent to computed properties
        //passes state and all existing getters
        availableProducts (state, getters) {
            //could return the length or an array ...
            //mostly used to calculate or filter things at runtime
            return state.products.filter(product => product.inventory > 0)
        
        }
    },

    actions:{
        //decides when mutation should fire
        //actions are methods
        //equivalents to actions
        //actions are also responsibles for the logic when the mutation should be fire
        fetchProducts({commit}){
            return new Promise((resolve, reject)=>{
                 //make an api call to feed the products
                // run setProducts mutation(call the mutation that sets the products)
                shop.getProducts(products => {
                commit('setProducts', products)
                resolve()
            })
        })
        },

        addProductToCart(context, product){
            if (product.inventory > 0){
                const cartItem = context.state.cart.find(item => item.id === product.id)
            if (!cartItem){
                context.commit('pushProductToCart', product.id)
            } else {
                context.commit('incrementItemQuantity', cartItem)
            }
            context.commit('decrementProductInventory', product)
        } 
        }
    },

    mutations: {
        // always responsible for state changes
        // responsible for setting and updating state
        // passes state and payload,here product is our payload
        setProducts(state, products){
            // update products
            state.products = products
        },


        pushProductToCart(state, productId){
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },

        decrementItemQuantity(state, cartItem){
            cartItem.inventory--;
        }
    }

})