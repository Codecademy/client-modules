// @ts-check

const {
  ESLintUtils,
  AST_NODE_TYPES,
} = require('@typescript-eslint/experimental-utils');
const ts = require('typescript');

module.exports.default = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @param {import('@typescript-eslint/experimental-utils').TSESTree.VariableDeclarator} node
       */
      'VariableDeclarator[id.typeAnnotation.typeAnnotation.typeName.left.name="React"][id.typeAnnotation.typeAnnotation.typeName.right.name="FC"]': function (
        node
      ) {
        console.log('checking react prop names...');
        const ReactFCAnnotation = node.id.typeAnnotation.typeAnnotation;
        if (ReactFCAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
          return;
        }
        const ReactFCParameters = ReactFCAnnotation.typeParameters;
        if (!ReactFCParameters) return;

        const ReactFCProps = ReactFCParameters.params[0];
        if (!ReactFCProps) return;
        if (ReactFCProps.type !== 'TSTypeReference') {
          context.report({
            messageId: 'ShouldMatch',
            node,
          });
          return;
        }

        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(
          ReactFCProps.typeName
        );
        const nodeType = checker.getTypeAtLocation(tsNode);
        const symbol = checker.getSymbolAtLocation(tsNode);
        const declaration = symbol.declarations[0];

        // if declaration is an import, that means it comes from another file
        // ...so we ignore it
        if (declaration.kind === ts.SyntaxKind.ImportSpecifier) {
          console.log('skipped this file');
          return;
        }

        // const symbol = nodeType.getSymbol();
        // nodeType
        //   .getSymbol()
        //   .getDeclarations()
        //   .forEach((d) => console.log(d.getText()));
        // const { symbol } = tsNode;
        // const declarationFile = symbol?.valueDeclaration?.getSourceFile();
        // const declarationFileName = declarationFile?.fileName;
        // console.log(declarationFileName);

        const componentNodeId = node.id;
        if (componentNodeId.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const componentName = componentNodeId.name;
        const propsTypeName = ReactFCProps.typeName;
        if (propsTypeName.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const propsName = propsTypeName.name;
        const expectedPropsName = `${componentName}Props`;

        if (propsName !== expectedPropsName) {
          context.report({
            messageId: 'ShouldMatch',
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: '',
      recommended: 'error',
    },
    messages: {
      ShouldMatch:
        'React prop names should match their corresponding component',
    },
    type: 'suggestion',
    schema: [],
  },
});
