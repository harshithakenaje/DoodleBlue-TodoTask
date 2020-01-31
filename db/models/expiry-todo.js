import mongoose from 'mongoose';

const ExpiryTodoSchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  taskId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  taskName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  expiredTime: {
    type: Date,
    required: true,
  },
  editedAt: {
    type: Date,
    required: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const TodoExpiry = mongoose.model('ExpiredTodo', ExpiryTodoSchema);

export default TodoExpiry;
