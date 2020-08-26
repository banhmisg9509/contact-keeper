import mongoose from 'mongoose';

const ContactSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String},
  type: { type: String, default: 'personal'},
  date: { type: String, default: Date.now },
});

export default mongoose.model('contact', ContactSchema);
