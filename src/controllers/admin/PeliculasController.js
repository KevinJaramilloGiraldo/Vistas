import Pelicula from '../../models/Pelicula.js';

// Obtener todas las películas
const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find()
      .populate("director_id", "nombre_director")  // Poblar solo el nombre del director
      .populate("generos", "nombre_genero");  // Poblar géneros si lo deseas
    res.json(peliculas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

// Obtener una película por ID
const getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película' });
  }
};

// Agregar una nueva película
const addPelicula = async (req, res) => {
  try {
    const newPelicula = new Pelicula(req.body);
    await newPelicula.save();
    res.status(201).json(newPelicula);
  } catch (error) {
    console.error("Error al agregar la película:", error.message); // Agrega el detalle del error
    res.status(500).json({ error: "Error al agregar la película", details: error.message });
  }
};

// Editar una película existente
const updatePelicula = async (req, res) => {
  try {
    const updatedPelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(updatedPelicula);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar película' });
  }
};

// Eliminar una película
const deletePelicula = async (req, res) => {
  try {
    const deletedPelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!deletedPelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar película' });
  }
};

export { getPeliculas, getPeliculaById, addPelicula, updatePelicula, deletePelicula };