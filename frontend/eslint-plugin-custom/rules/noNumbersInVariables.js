// eslint-disable-next-line no-undef
module.exports = {
  create: function (context) {
    return {
      VariableDeclarator(node) {
        const { id } = node;
        if (id.type === 'Identifier' && /[0-9]/.test(id.name)) {
          context.report(node, 'Variable names should not contain digits');
        }
      }
    };
  }
};
