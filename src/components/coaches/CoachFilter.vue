<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked  @change="isFilter" />
      <label for="frontend">frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="isFilter" />
      <label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="isFilter" />
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data(){
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      },
    };
  },
  methods: {
    isFilter(event){
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updateFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updateFilters;
      this.$emit('change-filter',updateFilters);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>