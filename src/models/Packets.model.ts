import { Document, Model, Schema, model } from 'mongoose';

interface IComment {
  test: string;
  creator: string;
}

export interface IPacket extends Document {
  title: string;
  likes: number;
  dislikes: number;
  views: number;
  creator: string;
  comments: IComment[];
  status: number;
}

interface IPacketModel extends Model<IPacket> {}

const Comments = new Schema(
  {
    text: { type: String, required: true },
    creator: Schema.Types.ObjectId,
  },
  { timestamps: true },
);

const PacketSchema = new Schema(
  {
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    creator: { type: Schema.Types.ObjectId, required: true },
    comments: { type: [Comments], default: [] },
    status: {
      type: Number,
      enum: [1, 0, -1],
      default: 1,
    },
  },
  { timestamps: true },
);

PacketSchema.index({
  title: 'text',
});

const PacketModel: IPacketModel = model<IPacket, IPacketModel>(
  'packet',
  PacketSchema,
);

export default PacketModel;
