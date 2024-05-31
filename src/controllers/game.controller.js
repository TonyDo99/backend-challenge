import { AppDataSource } from '../model/index.js';

// Inject repository
const gameRepository = AppDataSource.getRepository('GameSchema');

/**
 * Retrieves all games from the repository and sends them in the response.
 *
 * @param {Request} _ - The request object (unused in this function).
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const getGames = async (_, res) => {
  try {
    const games = await gameRepository.find();

    res.status(200).json({
      status: true,
      data: games,
      message: 'Games it return !',
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * Retrieves a game by its ID from the repository and sends it in the response.
 *
 * @param {Request} _ - The request object (unused in this function).
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const getGameById = async (_, res) => {
  try {
    const game = await gameRepository.findOneBy({
      id: res.params.id,
    });
    if (!game) {
      return res.status(403).json({
        status: false,
        data: null,
        message: 'Game title not found',
      });
    }

    res.status(200).json({
      status: true,
      data: game,
      message: 'Game was founded !',
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * Creates a new game with the data provided in the request body and sends the created game in the response.
 *
 * @param {Request} req - The request object containing the game data in the body.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const createGame = async (req, res) => {
  try {
    const game = gameRepository.create(req.body);
    const savedGame = await gameRepository.save(game);

    res.status(201).json({
      status: true,
      data: savedGame,
      message: 'Game was created success !',
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * Updates an existing game by its ID with the data provided in the request body and sends the updated game in the response.
 *
 * @param {Request} req - The request object containing the game data in the body and the game ID in the params.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const updateGame = async (req, res) => {
  try {
    const game = await gameRepository.findOneBy({
      id: req.params.id,
    });
    if (!game) {
      return res.status(404).json({
        status: false,
        data: savedGame,
        message: 'Game title not found !',
      });
    }

    gameRepository.merge(game, req.body);
    const updatedGame = await gameRepository.save(game);

    res.status(200).json({
      status: true,
      data: updatedGame,
      message: 'Game was updated success !',
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 * Deletes a game by its ID from the repository and sends a success message in the response.
 *
 * @param {Request} req - The request object containing the game ID in the params.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const deleteGame = async (req, res) => {
  try {
    const result = await gameRepository.softDelete({
      id: req.params.id,
    });
    if (result.affected === 0) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Delete game unsuccessfully !',
      });
    }

    res.status(200).json({
      status: true,
      data: result,
      message: 'Delete game successfully !',
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

export { getGames, getGameById, createGame, updateGame, deleteGame };
