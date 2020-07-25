const { GraphQLScalarType } = require('graphql/index');
const { isISO8601 } = require('validator');

const parseISO8601 = value => {
    if (isISO8601(value)) {
        return new Date(value);
    }
    throw new Error('parseISO8601: DateTime cannot represent an invalid ISO-8601 Date string (YYYY-MM-DDThh:mm:ss.time+hh:mm)');
};

const serializeISO8601 = value => {
    // For output i.e. response for graphql
    const valueAsString = value.toISOString();
    if (isISO8601(valueAsString)) {
        return valueAsString;
    }
    throw new Error('serializeISO8601: DateTime cannot represent an invalid ISO-8601 Date string (YYYY-MM-DDThh:mm:ss.time+hh:mm)');
};

const parseLiteralISO8601 = ast => {
    // For input payload i.e. for mutation
    if (isISO8601(ast.value)) {
        return new Date(ast.value);
    }
    throw new Error('parseLiteralISO8601: DateTime cannot represent an invalid ISO-8601 Date string (YYYY-MM-DDThh:mm:ss.time+hh:mm)');
};

const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'An ISO-8601 encoded UTC date string.',
    serialize: serializeISO8601,
    parseValue: parseISO8601,
    parseLiteral: parseLiteralISO8601,
});

module.exports = DateTime;
