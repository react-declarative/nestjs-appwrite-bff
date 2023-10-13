const express = require("express");
const list = require("./services/_list");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const listProduct = async (req, res, next) => {
  try {
    const result = await list({ query: req.query });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { listProduct };
