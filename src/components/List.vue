<template>
    <ul>
        <li v-for="(value, index) in parseData" :key="index">{{value}}</li>
    </ul>
</template>

<script>
import {flatten} from '../utils/utils';
export default {
    props: {
        values: Array,
    },

    data() {
        return {
            fluttened: [],
        }
    },

    computed: {
        parseData() {
            const flattened = [];
            function flatten(arr){
        for (let item of arr) {
          if (Array.isArray(item)) {
            console.log(item)
            flatten(item);
          } else {
            flattened.push(item);
          }
        }
     }
     flatten(this.values)
     return flattened;
        }
    },

    methods: {
        flatten(arr) {
            for (let item of arr) {
                if (Array.isArray(item))   {
              flatten(item);
                } else {
        this.flattened.push(item);
                }
            }
 
        }
    }
}
</script>

<style lang="scss" scoped>
    ul {
        width: 30%;
        border: 1px solid grey;;
    }
    li {
        margin-bottom: 10px;
    }
</style>