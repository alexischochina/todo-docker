const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await req.pool.query('SELECT * FROM todos ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la récupération des todos' })
  }
})

router.post('/', async (req, res) => {
  const { title } = req.body
  try {
    const result = await req.pool.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de l’ajout du todo' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body
  try {
    const result = await req.pool.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo introuvable' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du todo' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await req.pool.query('DELETE FROM todos WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo introuvable' })
    }
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la suppression du todo' })
  }
})

module.exports = router;

