import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, useWindowDimensions, TextInput, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

type RootStackParamList = {
  Home: undefined;
  Video: { uri: string; title: string; sinopsis: string };
  Detail: { video: Video };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface Video {
  id: string;
  nombre: string;
  url_video: string;
  url_imagen: string;
  nombre_categoria: string; // This will store a comma-separated string of categories
  fecha_subida: string;
  sinopsis: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos los géneros');
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://192.168.0.13:5000/videos');
        const data = await response.json();

        if (Array.isArray(data)) {
          setVideos(data);
          setFilteredVideos(data);
        } else {
          console.error('La respuesta de la API no es un arreglo.');
        }
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.0.13:5000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchVideos();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = videos.filter(video => {
      const videoCategories = video.nombre_categoria.split(',').map(cat => cat.trim().toLowerCase());
      const isInSelectedGenre = selectedGenre === 'Todos los géneros' || videoCategories.includes(selectedGenre.toLowerCase());
      const isInSearchQuery = video.nombre.toLowerCase().includes(searchQuery.toLowerCase());

      return isInSelectedGenre && isInSearchQuery;
    });

    setFilteredVideos(filtered);
  }, [searchQuery, selectedGenre, videos]);

  const renderItem = ({ item }: { item: Video }) => (
    <View style={[styles.videoItem, { width: width / numColumns - 20 }]}>
      <Image 
        source={{ uri: item.url_imagen }} 
        style={styles.thumbnail} 
        onError={(e) => console.error('Error loading image:', e.nativeEvent.error)} 
      />
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.nombre}</Text>
      <Text style={styles.category}>{item.nombre_categoria}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Video', { uri: item.url_video, title: item.nombre, sinopsis: item.sinopsis })}
        >
          <Ionicons name="play-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Reproducir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Detail', { video: item })}
        >
          <Ionicons name="information-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar películas..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedGenre}
        onValueChange={(itemValue) => setSelectedGenre(itemValue)}
        style={styles.genrePicker}
      >
        <Picker.Item label="Todos los géneros" value="Todos los géneros" />
        {categories.map((genre, index) => (
          <Picker.Item key={index} label={genre} value={genre} />
        ))}
      </Picker>
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={numColumns} // Fuerza el re-renderizado al cambiar el número de columnas
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Fondo oscuro estilo Netflix
  },
  listContainer: {
    padding: 10,
  },
  videoItem: {
    margin: 10,
    backgroundColor: '#1f1f1f', // Gris oscuro para las tarjetas
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#333', // Añadir un color de fondo mientras se carga la imagen
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    height: 60,
  },
  category: {
    color: '#aaa', // Color para la categoría
    padding: 10,
    paddingTop: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  genrePicker: {
    backgroundColor: '#333',
    color: 'white',
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  }
});

export default HomeScreen;
