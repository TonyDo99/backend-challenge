/**
 * Sends a JSON response with the provided status, data, and message.
 *
 * @param {Response} res - The response object used to send back the data.
 * @param {Object} options - The options for the response.
 * @param {boolean} options.status - The status of the response, indicating success or failure.
 * @param {any} options.data - The data to send in the response.
 * @param {string} options.message - The message to send in the response.
 * @returns {Response} The response object with the JSON data sent.
 */
export const HandlerResponse = (res, { status, data, message }) =>
  res.json({
    status,
    data,
    message,
  });
