<template>
<div>
  <h3>Filters</h3>
    <span v-for="area in areas" :key="area">
      <input type="checkbox" :name="area" :id="area" checked @change="setFilter">
      <label :for="area" class="ml-1 mr-2">{{ area }}</label>
    </span>
</div>
</template>
<script>
export default {
  data(){
    return {
      filters: {},
    }
  },
  created(){
    this.areas.forEach((area)=>{
      this.filters[area] = true;
    });
  },
  computed:{
    areas(){
      return this.$store.getters['_coaches/getFilteredAreas'];
    },
  },
  methods:{
    setFilter(event){
      const inputId = event.target.id;
      const isChecked = event.target.checked;
      // Update filters.
      const updatedFilters = {
        ...this.filters,
        [inputId]: isChecked
      }
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);

    },
    // emits: ['change-filter'],
    emits: {
      'change-filter': (updatedFilters)=>{
        return typeof updatedFilters === 'object'
        && updatedFilters !== null;
      }
    },
  }
};
</script>