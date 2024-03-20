import mongoose from 'mongoose';

const AgroConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", AgroConversationSchema);