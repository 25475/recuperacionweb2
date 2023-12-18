const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Inserción masiva
app.post('/api/tvshows/insert-massive', async (req, res) => {
  const tvShowsToInsert = req.body;

  try {
    // Insertar los elementos en la base de datos
    const insertedTvShows = await prisma.tvshow.createMany({
      data: tvShowsToInsert,
    });

    res.json({ success: true, insertedTvShows });
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Consulta
app.get('/api/tvshows/get-all', async (req, res) => {
  try {
    //colecciones
    const allTvShows = await prisma.tvshow.findMany();

    res.json({ success: true, allTvShows });
  } catch (error) {
    console.error('Error al consultar colecciones:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const port = 5500;

app.listen(port, () => {
  console.log(`Servidor http://localhost:${port}`);
});


