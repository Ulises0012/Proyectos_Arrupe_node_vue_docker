<template>
  <main>
    <ImageBanner />
    <SoccerJerseyList />
  </main>
</template>

<script>
import ImageBanner from './ImageBanner.vue';
import SoccerJerseyList from './SoccerJerseyList.vue';

export default {
  components: {
    ImageBanner,
    SoccerJerseyList
  }
}
</script>