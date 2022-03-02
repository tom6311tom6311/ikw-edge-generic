import echo from './echo.resolver';

const resolvers = {
  Query: {
    echo,
  }
};

export default resolvers;
