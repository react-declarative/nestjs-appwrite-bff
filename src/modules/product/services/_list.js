const list = async ({ query }) => {
  const limit = query.page.limit || 20;
  const offset = query.page.offset || 0;
  let datas;
  await fetch(
    "https://www.olx.uz/api/v1/offers/?offset=40&limit=40&category_id=1511&currency=UZS&filter_enum_furnished%5B0%5D=yes&filter_refiners=&sl=18a18198c64x162fdf69"
  )
    .then((data) => data.json())
    .then(({ data }) => (datas = data));

  let data = datas.splice(offset, limit);
  return {
    data,
    pageInfo: {
      limit,
      offset,
      totalPage: Math.trunc(datas.length / limit) + 1,
      totalProduct: datas.length,
    },
  };
};
module.exports = list;
