/**
 * @fileoverview Local ESLint plugin that bans italic styling everywhere.
 * This enforces the project-wide decision to never use italic text.
 */

/** @type {import('eslint').Rule.RuleModule} */
const noItalic = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow italic styling in code",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      noItalicProperty:
        "The `italic` property is forbidden. Remove italic styling from the codebase.",
      noItalicStyle:
        "Italic font styling is forbidden (`{{style}}`). Use regular weight instead.",
      noItalicClass:
        "The `italic` CSS class is forbidden. Remove italic styling.",
    },
  },
  create(context) {
    return {
      // { italic: true } or { italic: "anything" }
      Property(node) {
        if (node.key.type === "Identifier" && node.key.name === "italic") {
          context.report({ node, messageId: "noItalicProperty" });
        }

        // fontStyle: "italic" | 'italic' | `italic`
        if (
          node.key.type === "Identifier" &&
          (node.key.name === "fontStyle" || node.key.name === "font-style")
        ) {
          const val = node.value;
          if (
            val.type === "Literal" &&
            typeof val.value === "string" &&
            val.value.toLowerCase() === "italic"
          ) {
            context.report({
              node,
              messageId: "noItalicStyle",
              data: { style: `${node.key.name}: "${val.value}"` },
            });
          }
        }
      },

      // <Component italic /> or <Component italic={true} />
      JSXAttribute(node) {
        if (node.name.type === "JSXIdentifier" && node.name.name === "italic") {
          context.report({ node, messageId: "noItalicProperty" });
        }
      },

      // "italic" inside className / class / style strings
      // Checks both Literal and TemplateElement
      Literal(node) {
        if (typeof node.value !== "string") return;
        const text = node.value;
        // Match "italic" as a whole word in class strings
        if (/\bitalic\b/.test(text)) {
          context.report({ node, messageId: "noItalicClass" });
        }
      },

      TemplateElement(node) {
        const text = node.value.cooked ?? node.value.raw;
        if (/\bitalic\b/.test(text)) {
          context.report({ node, messageId: "noItalicClass" });
        }
      },
    };
  },
};

export default {
  rules: {
    "no-italic": noItalic,
  },
};
