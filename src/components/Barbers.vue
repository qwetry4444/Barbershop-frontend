<script>
import { DataTable, Column } from 'primevue'
import { useDataStore } from '@/stores/dataStore.js'

export default {
  name: "Barbers",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 2,
      offset: 0,
    }
  },
  computed: {
    barbers() {
      return this.dataStore.barbers;
    },
    barbers_total() {
      return this.dataStore.barbers_total;
    },
  },
  async mounted() {
    console.log('Barbers component mounted.')
    await this.dataStore.get_barbers();
    await this.dataStore.get_barbers_total();
    console.log('Barbers = ', this.barbers);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_barbers(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<template>
  <DataTable
    :value="barbers"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rows-per-page-options="[2, 5, 10]"
    :total-records="barbers_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Имя" />
    <Column field="experience" header="Стаж" />
  </DataTable>
</template>

<style scoped></style>







