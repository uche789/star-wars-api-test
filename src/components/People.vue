<template>
  <div class="people">
    <Message v-if="error" message-type="error" @close="error = ''"
      ><template #body>{{ error }}</template></Message
    >
    <Pagination
      :count="pages"
      :previous="people.previous"
      :next="people.next"
      @selected="selectedPage"
      v-if="results.length > 0"
    >
      Pages {{ count }} of {{ pages }}
    </Pagination>
    <div class="people__list">
      <table class="table" v-if="results.length > 0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Height</th>
            <th scope="col">Mass</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">Planet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.name }}</td>
            <td>{{ result.height }}</td>
            <td>{{ result.mass }}</td>
            <td>{{ result.created }}</td>
            <td>{{ result.edited }}</td>
            <td>
              <a @click="getPlanet(result.homeworld, result.name)">Link</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal @close="show = false" :show="show">
      <template #title>{{ planet.name }}</template>
      <template #body>
        <PlanetInfo :planet="planet" />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal.vue";
import { People, Person, Planet } from "@/services/api";
import { State } from "@/store";
import { cloneDeep } from "lodash";
import PlanetInfo from "@/components/PlanetInfo.vue";
import Pagination from "@/components/Pagination.vue";
import Message from "@/components/Message.vue";

export default Vue.extend({
  components: {
    Modal,
    PlanetInfo,
    Pagination,
    Message
  },
  data: () => ({
    show: false,
    error: "" as string,
    count: 1
  }),
  computed: {
    planet(): Planet | null {
      return cloneDeep((this.$store.state as State).planet);
    },
    people(): People | null {
      return cloneDeep((this.$store.state as State).people);
    },
    results(): Person[] {
      return this.people
        ? this.people.results.map((result: Person) => {
            result.created = new Date(result.created).toLocaleDateString();
            result.edited = new Date(result.edited).toLocaleDateString();
            return result;
          })
        : [];
    },
    pages(): number {
      return Math.ceil(
        this.people ? this.people.count / this.results.length : 0
      );
    }
  },
  async created(): Promise<void> {
    await this.fetch();
  },
  methods: {
    async selectedPage(value: string) {
      this.count = parseInt(
        value.replace("http://swapi.dev/api/people/?page=", "")
      );
      await this.fetch(value);
    },
    async fetch(value?: string): Promise<void> {
      try {
        await this.$store.dispatch("fetchPeople", value);
      } catch {
        this.error = `Something must have happend! We couldn't fetch the list of Star Wars aliens!!`;
      }
    },
    async getPlanet(link: string, name: string): Promise<void> {
      try {
        await this.$store.dispatch("fetchPlanet", link);
        this.show = true;
      } catch {
        this.error = `Something must have happend! We couldn't fetch the planet details for ${name}`;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.people {
  &__list {
    overflow: auto;

    .table {
      margin: auto;
    }
  }
}
</style>
