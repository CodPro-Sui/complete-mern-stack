const pagination = async (page,limit = 10,model,filter = {}) =>{
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;
  const totalDocs = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalDocs / limit);
  const startInd = skip + 1;
  return {
    page,
    limit,
    skip,
    totalDocs,
    totalPages,
    hasPre: page > 1,
    hasNext: totalPages > page,
    startInd
  }
}
export default pagination;
