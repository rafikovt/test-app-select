<template>
    <multiselect v-if="options.length" v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :taggable="false"  placeholder="Pick some"  >
        <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
    </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect,
    },

    props: {
        options: Array,
    },

    data() {
        return {
            value: null,
        }
    },

    watch: {
        value(val) {
           this.$store.commit('updateValues', val)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>