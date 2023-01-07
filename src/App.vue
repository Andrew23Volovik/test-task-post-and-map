<template>
  <div id="app">
    <TheHeader />
    <TheMain />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheMain from '@/components/TheMain.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'TheAppComponent',
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
