const defaultPort = 4000;

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  mongoDb: {
    databaseName: string;
    url: string;
  };
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || defaultPort,
  mongoDb: {
    databaseName: process.env.MONGODB_DB_NAME as string,
    url: process.env.MONGODB_URL as string,
  },
};
