module.exports = {
  native: true,
  typescript: true,
  template: function (variables, { tpl }) {
    return tpl`
      ${variables.imports}
  
      export const ${variables.componentName} = (${variables.props}) => (
        ${variables.jsx}
      );
    `;
  },
}