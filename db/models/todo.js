import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  completedAt: {
    type: Date,
  },
  editedAt: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  expiry: {
    type: Date,
    required: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
