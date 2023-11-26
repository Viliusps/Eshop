// eslint-disable-next-line no-undef
module.exports = {
  create: function (context) {
    return {
      FunctionDeclaration(node) {
        const { id } = node;
        if (id.type === 'Identifier' && !id.name[0].match(/^[a-z]$/)) {
          context.report(node, 'Function names should start with a lowercase letter');
        }
      }
    };
  }
};
