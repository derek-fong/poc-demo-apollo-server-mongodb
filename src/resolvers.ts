import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { ObjectID } from 'mongodb';

import { database } from './connect-mongodb';
import {
  AddPostInput,
  Post,
  PostDbObject,
  User,
} from './graphql-codegen-typings';

const testUser: User = {
  id: 'TEST_USER_ID',
  firstName: 'Test',
  lastName: 'User',
  emailAddress: 'test.user@test.com',
};

export default {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  User: (): User => testUser,
  Query: {
    post: async (obj: any, { id }: { id: string }): Promise<Post | null> => {
      const post = await database
        .collection('posts')
        .findOne({ _id: new ObjectID(id) });

      return post;
    },
  },
  Post: {
    id: (obj: Post | PostDbObject): string | ObjectID =>
      (obj as Post).id || (obj as PostDbObject)._id,
    createdBy: (): User => testUser,
    likedBy: (): User[] => [testUser],
  },
  Mutation: {
    addPost: async (
      obj: any,
      { input }: { input: AddPostInput }
    ): Promise<any> => {
      const newPost = await database.collection('posts').insertOne({
        title: input.title,
        content: input.content,
        createdAt: new Date(),
        createdBy: testUser.id,
      });

      return newPost.ops[0];
    },
  },
};
