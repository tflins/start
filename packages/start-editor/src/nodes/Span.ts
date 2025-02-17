import { Plugin } from 'prosemirror-state';
import { NodeInterface } from '../interface/NodeInterface';
import { NodeSpec, Command, StyleObject } from '../type';
import { objToStyleString, styleStringToObj } from 'start-editor-utils';

export const SPAN_NODE_NAME = 'span';

export interface SpanCommand<T = boolean> {}

export class SpanNode extends NodeInterface<SpanCommand<Command>> {
  get name(): string {
    return SPAN_NODE_NAME;
  }

  nodeSpec(defaultStyle: StyleObject = {}): NodeSpec {
    const tags = ['s', 'strike', 'del', 'strong', 'b', 'i', 'em', 'u', 'span.start-editor-span'];
    return {
      content: 'text*',
      group: 'inline',
      inline: true,
      selectable: false,
      attrs: {
        style: {
          default: defaultStyle,
        },
      },
      parseDOM: tags.map((tag) => ({
        tag,
        getAttrs(dom) {
          const ele = dom as HTMLElement;
          const style = styleStringToObj(ele.style.cssText, defaultStyle);
          return { style };
        },
      })),
      toDOM: (node) => {
        return [
          'span',
          {
            style: objToStyleString(node.attrs.style),
            class: 'start-editor-node-node start-editor-span',
          },
          0,
        ];
      },
    };
  }

  commands(): SpanCommand<Command> {
    return {};
  }
  plugins(): Plugin<any, any>[] {
    return [];
  }
}
