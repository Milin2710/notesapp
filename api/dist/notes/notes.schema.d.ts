import { Document } from 'mongoose';
export declare class NoteMongo {
    title: string;
    content: string;
    username: string;
    email: string;
    created_at: Date;
}
export type NoteMongoDocument = NoteMongo & Document;
export declare const NoteSchema: import("mongoose").Schema<NoteMongo, import("mongoose").Model<NoteMongo, any, any, any, Document<unknown, any, NoteMongo> & NoteMongo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NoteMongo, Document<unknown, {}, import("mongoose").FlatRecord<NoteMongo>> & import("mongoose").FlatRecord<NoteMongo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
