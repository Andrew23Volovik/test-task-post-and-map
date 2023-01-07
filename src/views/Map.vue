<template>
  <div class="map container">
    <Teleport to="body">
      <TheModal v-if="isModal">
        <template #header>Creating a marker</template>
        <template #main>
          <form id="form">
            <TheTextfield
              v-model="inputName"
              :errorMsg="errorObj.nameError"
              :label="'Name:'"
              @input="checkForm"
            ></TheTextfield>
            <TheTextfield
              v-model="inputLat"
              :errorMsg="errorObj.latError"
              :label="'Latitude:'"
              @input="checkForm"
            ></TheTextfield>
            <TheTextfield
              v-model="inputLng"
              :errorMsg="errorObj.lngError"
              :label="'Longitude:'"
              @input="checkForm"
            ></TheTextfield>
          </form>
        </template>
        <template #footer>
          <TheButton form="form" @click.prevent="createMarker">
            Create
          </TheButton>
          <TheButton @click="closeModal">Close</TheButton>
        </template>
      </TheModal>
    </Teleport>
    <TheCard>
      <div id="mapContainer"></div>
    </TheCard>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount, reactive } from 'vue';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import TheCard from '@/components/UI/TheCard.vue';
import TheModal from '@/components/UI/TheModal.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheTextfield from '@/components/UI/TheTextfield.vue';

export default {
  name: 'TheMapPageComponent',
  components: {
    TheCard,
    TheModal,
    TheButton,
    TheTextfield,
  },
  setup() {
    const inputName = ref();
    const inputLat = ref();
    const inputLng = ref();
    const errorObj = reactive({
      nameError: '',
      latError: '',
      lngError: '',
    });

    const marker = ref();
    const markerPos = ref();
    const arrOfMarkers = ref([]);

    const myIcon = L.icon({
      iconUrl: require('../assets/location.svg'),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    function addMarker(e) {
      inputLat.value = e.latlng.lat.toFixed(4);
      inputLng.value = e.latlng.lng.toFixed(4);
      markerPos.value = [inputLat.value, inputLng.value];
      showModal();
    }

    function createMarker() {
      if (
        inputName.value !== undefined &&
        inputLat.value !== '' &&
        inputLng.value !== ''
      ) {
        marker.value = L.marker([inputLat.value, inputLng.value], {
          icon: myIcon,
        }).addTo(map.value);

        const tooltipContent = `
          <b>Marker: ${inputName.value}</b><br/>
          <b>Latitude:${inputLat.value}</b><br/>
          <b>Longitude:${inputLng.value}</b><br/>
        `;

        marker.value.bindTooltip(tooltipContent);
        arrOfMarkers.value.push({
          marker: markerPos.value,
          tooltip: tooltipContent,
        });

        closeModal();
        inputName.value = null;
        setToLocalStorage();
      } else {
        checkForm();
      }
    }

    const isModal = ref(false);
    function showModal() {
      isModal.value = true;
    }

    function closeModal() {
      isModal.value = false;
    }

    function checkForm() {
      if (inputName.value === undefined) {
        errorObj.nameError = 'Please enter name';
      } else {
        errorObj.nameError = '';
      }
      if (inputLat.value === '') {
        errorObj.latError = 'Please enter lat';
      } else {
        errorObj.latError = '';
      }
      if (inputLng.value === '') {
        errorObj.lngError = 'Please enter lng';
      } else {
        errorObj.lngError = '';
      }
    }

    function setToLocalStorage() {
      const parsed = JSON.stringify(arrOfMarkers.value);
      localStorage.setItem('arrayOfMarkers', parsed);
    }

    function getFromLocalStorage() {
      const arr = JSON.parse(localStorage.getItem('arrayOfMarkers'));
      if (arr) {
        arr.forEach((el) => arrOfMarkers.value.push(el));
        return arr;
      } else {
        return [];
      }
    }

    const map = ref();
    onMounted(() => {
      map.value = L.map('mapContainer').setView([48.95, 31.5], 6);
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        minZoom: 4,
        maxZoom: 16,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map.value);

      const markers = getFromLocalStorage();
      L.layerGroup(
        markers.map((el) => {
          return L.marker([...el.marker], { icon: myIcon }).bindTooltip(
            el.tooltip
          );
        })
      ).addTo(map.value);

      map.value.on('click', addMarker);
    });

    onBeforeUnmount(() => {
      if (map.value) {
        map.value.remove();
      }
    });

    return {
      isModal,
      inputName,
      inputLat,
      inputLng,
      closeModal,
      createMarker,
      errorObj,
      checkForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.map {
  #mapContainer {
    width: 100vh;
    height: 70vh;
    z-index: 1;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>