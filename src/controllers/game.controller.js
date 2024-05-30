import { AppDataSource } from '../model/index.js';

// Inject repository
const gameRepository = AppDataSource.getRepository('GameSchema');

const getGames = async (_, res) => {
  const gameTitles = await gameRepository.find();
  res.json(gameTitles);
};

const getGameById = async (req, res) => {
  const gameTitle = await gameRepository.findOneBy({
    id: parseInt(req.params.id, 10),
  });
  if (!gameTitle) {
    return res.status(404).json({ message: 'Game title not found' });
  }
  res.json(gameTitle);
};

const createGame = async (req, res) => {
  const newGameTitle = gameRepository.create(req.body);
  const savedGameTitle = await gameRepository.save(newGameTitle);
  res.status(201).json(savedGameTitle);
};

const updateGame = async (req, res) => {
  const gameTitle = await gameRepository.findOneBy({
    id: parseInt(req.params.id, 10),
  });
  if (!gameTitle) {
    return res.status(404).json({ message: 'Game title not found' });
  }
  gameRepository.merge(gameTitle, req.body);
  const updatedGameTitle = await gameRepository.save(gameTitle);
  res.json(updatedGameTitle);
};

const deleteGame = async (req, res) => {
  const result = await gameRepository.delete({
    id: parseInt(req.params.id, 10),
  });
  if (result.affected === 0) {
    return res.status(404).json({ message: 'Game title not found' });
  }
  res.status(204).send();
};

export { getGames, getGameById, createGame, updateGame, deleteGame };
