import mongoose from 'mongoose';

const mongodbUri =
  'mongodb+srv://developer:Candidabio@candid.4zpyxet.mongodb.net/?retryWrites=true&w=majority&appName=candid';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function startDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUri)
      .then((mongoose) => {
        console.log('You successfully Connected');
        return mongoose;
      })
      .catch((err) => console.log(err));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
``;
export default startDb;
