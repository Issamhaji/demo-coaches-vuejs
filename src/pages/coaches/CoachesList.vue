<template>
  <section>
    <coach-filter @change-filter="isFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
            v-for="item in filterCoaches"
            :key="item.id"
            :firstname="item.firstName"
            :lastname="item.lastName"
            :rate="item.hourlyRate"
            :areas="item.areas"
            :id="item.id"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
  export default {
    components: {
      CoachItem,
      CoachFilter,
    },
    data(){
      return {
        activeFilters: {
          frontend: true,
          backend: true,
          career: true
        }
      };
    },
    computed: {
      filterCoaches(){
        const coaches = this.$store.getters['coache/getCoaches'];
        return coaches.filter(coache =>{
          if(this.activeFilters.frontend && coache.areas.includes('frontend')){
            return true;
          }
          if(this.activeFilters.backend && coache.areas.includes('backend')){
            return true;
          }
          if(this.activeFilters.career && coache.areas.includes('career')){
            return true;
          }
          return false;
        });
      },
      hasCoaches(){
        return this.$store.getters['coache/hasCoaches'];
      }
    },
    methods: {
      isFilter(updateFilters){
        this.activeFilters = updateFilters;
      }
    }
  };
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
