<script>
import { DataTable, Column } from 'primevue'
import Button from 'primevue/button'
import PrimeImage from 'primevue/image'
import { useDataStore } from '@/stores/dataStore.js'

export default {
  name: "Services",
  components: { DataTable, Column, Button, PrimeImage },
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
  <div class="p-4">
    <div class="table_head_container">
      <h2 class="text-lg font-bold">Список услуг</h2>
      <router-link to="/ServiceForm">
        <Button
          label="Добавить"
          icon="pi pi-plus"
          severity="secondary"
        />
      </router-link>

    </div>
    <DataTable
      :value="services"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rows-per-page-options="[2, 3, 5, 10]"
      :total-records="services_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <Column field="id" header="№" />
      <Column field="name" header="Наименование" />
      <Column field="price" header="Стоимость" />
      <Column field="description" header="Описание" />
      <Column header="Изображение">
        <template #body="slotProps">
          <PrimeImage
            :src="slotProps.data.picture_url"
            width="120"
            preview
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.table_head_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
