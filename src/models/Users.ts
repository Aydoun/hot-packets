import { Document, Model, Schema, model } from 'mongoose';

export interface IUser extends Document {
  title: string;
  likes: number;
  dislikes: number;
  views: number;
  creator: string;
  status: number;
}

interface IUserModel extends Model<IUser> {}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    sexe: { type: Number, enum: [0, 1, -1], default: 0 }, // Default male == 0
    privacy: { type: Array, default: [] },
    avatar: { type: String, default: '' },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    packets: [Schema.Types.ObjectId],
    status: { type: Number, enum: [-1, 0, 1, 2], default: 2 }, // Default Of Pending == 2
  },
  { timestamps: true },
);

UserSchema.index({
  title: 'email',
});

const UserModel: IUserModel = model<IUser, IUserModel>('user', UserSchema);

export default UserModel;
