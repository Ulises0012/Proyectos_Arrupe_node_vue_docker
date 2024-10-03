<template>
  <div class="banner">
    <img v-for="(image, index) in images" 
         :key="index" 
         :src="image" 
         :class="{ active: index === currentImageIndex }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/Barca1.jpg',
        '/madrid1.jpg',
        '/United1.jpg',
      ],
      currentImageIndex: 0
    };
  },
  mounted() {
    setInterval(this.nextImage, 5000);
  },
  methods: {
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  }
};
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 400px; /* Ajusta esta altura según tus necesidades */
  overflow: hidden;
}

.banner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.banner img.active {
  opacity: 1;
}
</style>