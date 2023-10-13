const axios = require("axios");
const { BadRequestError } = require("../../../shared/errors");

const list = async ({ query }) => {
  const limit = query.limit || 20;
  const offset = query.offset || 0;
  const category_id = query.category_id;

  const url = new URL(
    "https://www.olx.uz/api/v1/offers/?&currency=UZS&filter_enum_furnished%5B0%5D=yes&filter_refiners=&sl=18a18198c64x162fdf69"
  );

  const searchParams = url.searchParams;

  if (offset < 0 || offset > 50) {
    throw new BadRequestError("offset can be at least 0 and at most 50.");
  }
  if (limit < 0 || limit > 50) {
    throw new BadRequestError("limit can be at least 0 and at most 50.");
  }

  searchParams.set("limit", limit.toString());
  searchParams.set("offset", offset.toString());
  searchParams.set("category_id", category_id.toString());

  const response = await axios.get(url);

  const dates = response.data.data;

  const pageInfo = {
    limit,
    offset,
    totalPage: Math.trunc(dates.length / limit) + 1,
    totalProduct: dates.length,
  };

  return { data: dates, pageInfo };
};
module.exports = list;
