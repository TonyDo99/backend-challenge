import { AppDataSource } from '../model/index.js';
import { HandlerResponse } from '../utils/response.js';

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
  const games = await gameRepository.find();
  HandlerResponse(res.status(200), {
    status: true,
    data: games,
    message: 'Games it return !',
  });
};

/**
 * Retrieves a game by its ID from the repository and sends it in the response.
 *
 * @param {Request} _ - The request object (unused in this function).
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const getGameById = async (_, res) => {
  const game = await gameRepository.findOneBy({
    id: res.params.id,
  });
  if (!game) {
    return HandlerResponse(res.status(403), {
      status: false,
      data: null,
      message: 'Game title not found',
    });
  }
  HandlerResponse(res.status(200), {
    status: true,
    data: game,
    message: 'Game was founded !',
  });
};

/**
 * Creates a new game with the data provided in the request body and sends the created game in the response.
 *
 * @param {Request} req - The request object containing the game data in the body.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const createGame = async (req, res) => {
  const game = gameRepository.create(req.body);
  const savedGame = await gameRepository.save(game);

  HandlerResponse(res.status(201), {
    status: true,
    data: savedGame,
    message: 'Game was created success !',
  });
};

/**
 * Updates an existing game by its ID with the data provided in the request body and sends the updated game in the response.
 *
 * @param {Request} req - The request object containing the game data in the body and the game ID in the params.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const updateGame = async (req, res) => {
  const game = await gameRepository.findOneBy({
    id: req.params.id,
  });
  if (!game) {
    return HandlerResponse(res.status(404), {
      status: false,
      data: savedGame,
      message: 'Game title not found !',
    });
  }

  gameRepository.merge(game, req.body);
  const updatedGame = await gameRepository.save(game);

  HandlerResponse(res.status(200), {
    status: true,
    data: updatedGame,
    message: 'Game was updated success !',
  });
};

/**
 * Deletes a game by its ID from the repository and sends a success message in the response.
 *
 * @param {Request} req - The request object containing the game ID in the params.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const deleteGame = async (req, res) => {
  const result = await gameRepository.softDelete({
    id: req.params.id,
  });
  if (result.affected === 0) {
    return HandlerResponse(res.status(404), {
      status: false,
      data: null,
      message: 'Delete game unsuccessfully !',
    });
  }
  HandlerResponse(res.status(200), {
    status: true,
    data: result,
    message: 'Delete game successfully !',
  });
};

export { getGames, getGameById, createGame, updateGame, deleteGame };
