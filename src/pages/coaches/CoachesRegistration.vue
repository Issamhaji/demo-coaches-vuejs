<template>
  <h2>registe</h2>
  <coach-form @save-data="saveData"></coach-form>

</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(formData){
      this.$store.dispatch('coache/registerCoach', formData);
      //go to /coaches and u can goBack
      //this.$router.push('/coaches');
      this.$router.replace('/coaches');  // u can;t go back

    },

  }
}
</script>