import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefinitions = /* GraphQL */ `
  type Query {
    echo(str: String!): String!
  }
`;

type EchoArgs = {
  str: string;
}

const resolvers = {
  Query: {
    echo: (parent: unknown, args: EchoArgs) => args.str,
  },
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
