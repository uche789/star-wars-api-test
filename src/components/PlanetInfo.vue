<template>
  <div class="planet">
    <table class="table">
      <tbody>
        <tr>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Population</th>
        </tr>
        <tr>
          <td>{{ planet.diameter }}</td>
          <td>{{ planet.climate }}</td>
          <td>{{ planet.population }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Planet } from "@/services/api";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    planet: Object as PropType<Planet>
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.planet {
  .table {
    margin: auto;
  }
}
</style>
