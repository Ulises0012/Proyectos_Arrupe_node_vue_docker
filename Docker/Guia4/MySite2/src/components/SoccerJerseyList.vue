<template>
    <div class="soccer-jersey-list">
      <h2>Camisetas de Fútbol</h2>
      
      <div class="filters">
        <select v-model="selectedCategory" @change="filterJerseys">
          <option value="">Todas las categorías</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        
        <select v-model="sortBy" @change="sortJerseys">
          <option value="name">Ordenar por nombre</option>
          <option value="price">Ordenar por precio</option>
        </select>
      </div>
  
      <div class="jersey-grid">
        <div v-for="jersey in filteredJerseys" :key="jersey.id" class="jersey-item">
          <img :src="jersey.image" :alt="jersey.name">
          <h3>{{ jersey.name }}</h3>
          <p>Categoría: {{ jersey.category }}</p>
          <p>Precio: ${{ jersey.price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jerseys: [
          { id: 1, name: 'Barcelona Home', category: 'La Liga', price: 89.99, image: '/Barca.jpg' },
          { id: 2, name: 'Real Madrid Away', category: 'La Liga', price: 94.99, image: '/Madrid.jpg' },
          { id: 3, name: 'Manchester United Home', category: 'Premier League', price: 79.99, image: '/United.jpg' },
          { id: 4, name: 'Bayern Munich Home', category: 'Bundesliga', price: 84.99, image: '/Munich.jpg' },
        ],
        selectedCategory: '',
        sortBy: 'name',
        categories: ['La Liga', 'Premier League', 'Bundesliga', 'Serie A']
      }
    },
    computed: {
      filteredJerseys() {
        let result = this.jerseys;
        if (this.selectedCategory) {
          result = result.filter(jersey => jersey.category === this.selectedCategory);
        }
        return result.sort((a, b) => {
          if (this.sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } else {
            return a.price - b.price;
          }
        });
      }
    },
    methods: {
      filterJerseys() {
      },
      sortJerseys() {
      }
    }
  }
  </script>
  
  <style scoped>
  .soccer-jersey-list {
    padding: 20px;
  }
  
  .filters {
    margin-bottom: 20px;
  }
  
  .jersey-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .jersey-item {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .jersey-item img {
    max-width: 100%;
    height: auto;
  }
  </style>