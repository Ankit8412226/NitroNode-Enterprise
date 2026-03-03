const User = require('./user.model');

const create = async (data) => {
  return User.create(data);
};

const findById = async (id) => {
  return User.findById(id);
};

const findByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });
  if (includePassword) query.select('+password');
  return query.exec();
};

const updateById = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return User.findByIdAndDelete(id);
};

const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    User.find(filter).sort(sort).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  return { data, total, page, limit };
};

module.exports = {
  create,
  findById,
  findByEmail,
  updateById,
  deleteById,
  findAll,
};
