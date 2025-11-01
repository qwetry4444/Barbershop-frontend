<script>
import { DataTable, Column } from 'primevue'
import { useDataStore } from '@/stores/dataStore.js'

export default {
  name: "Services",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 2,
      offset: 0,
    }
  },
  computed: {
    services() {
      return this.dataStore.services
    },
    services_total() {
      return this.dataStore.services_total
    },
  },
  async mounted() {
    console.log('Services component mounted.')
    await this.dataStore.get_services();
    await this.dataStore.get_services_total();
    console.log('Services = ', this.services);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_services(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<template>
  <DataTable
    :value="services"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rows-per-page-options="[2, 5, 10]"
    :total-records="services_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="№" />
    <Column field="name" header="Наименование" />
    <Column field="price" header="Стоимость" />
    <Column field="description" header="Описание" />
  </DataTable>
</template>

<style scoped></style>
