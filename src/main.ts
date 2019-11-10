import { ApolloServer } from 'apollo-server';
import { DateTimeMock, EmailAddressMock } from 'graphql-scalars';

import { connectMongoDbAsync } from './connect-mongodb';
import { environment } from './environment';
import resolvers from './resolvers';
import * as typeDefs from './type-defs.graphql';

(async function bootstrapAsync(): Promise<void> {
  await connectMongoDbAsync(
    environment.mongoDb.url,
    environment.mongoDb.databaseName
  );

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: environment.apollo.introspection,
    mockEntireSchema: false,
    mocks: {
      DateTime: DateTimeMock,
      EmailAddress: EmailAddressMock,
    },
    playground: environment.apollo.playground,
  });

  server
    .listen(environment.port)
    .then(({ url }) => console.log(`Server ready at ${url}. `));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
  }
})();
