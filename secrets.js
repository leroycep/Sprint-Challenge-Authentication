module.exports = {
  jwtSecret: process.env.JWT_SECRET || "not all that is gold glitters",
  hashRounds: process.env.HASH_ROUNDS || 8,
};
