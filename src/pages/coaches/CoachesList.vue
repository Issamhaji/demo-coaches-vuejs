<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="isFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
  export default {
    components: {
      CoachItem,
      CoachFilter,
    },
    created() {
      this.loadCoaches();
    },
    data(){
      return {
        isLoading: false,
        error: null,
        activeFilters: {
          frontend: true,
          backend: true,
          career: true
        }
      };
    },
    computed: {
      isCoach() {
        return this.$store.getters['coache/isCoach'];
      },
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
      },
      async loadCoaches(refresh = false){
        this.isLoading = true;
        try {
          await this.$store.dispatch('coache/setCoaches', {forceRefresh: refresh});
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
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
