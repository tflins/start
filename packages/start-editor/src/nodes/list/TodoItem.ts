import { Plugin, EditorState } from 'prosemirror-state';
import { NodeInterface } from '../../interface/NodeInterface';
import { NodeSpec, Dispatch, Command, StyleObject } from '../../type';
import { objToStyleString, styleStringToObj } from 'start-editor-utils';

export const TODO_ITEM_NODE_NAME = 'todoItem';

export interface TodoItemCommand<T = boolean> {}

export class TodoItemNode extends NodeInterface<TodoItemCommand<Command>> {
  get name(): string {
    return TODO_ITEM_NODE_NAME;
  }

  nodeSpec(defaultStyle: StyleObject = {}): NodeSpec {
    return {
      content: 'inline+',
      group: 'block',
      attrs: {
        hasDOne: {
          default: false,
        },
        style: {
          default: defaultStyle,
        },
      },
      parseDOM: [
        {
          tag: 'dt',
          getAttrs(dom) {
            const element = dom as HTMLElement;
            const style = styleStringToObj(element.style.cssText, defaultStyle);
            return {
              style,
              hasDone: element.getAttribute('data-has-done') === 'true' || element.getAttribute('checked'),
            };
          },
        },
      ],
      toDOM: (node) => {
        const {
          attrs: { hasDone },
        } = node;
        const inputAttrs: Record<string, any> = { type: 'checkbox' };
        if (hasDone) {
          inputAttrs['checked'] = 'true';
        }

        return [
          'dt',
          {
            style: '',
            class: 'start-editor-node start-editor-todo_item',
            'data-has-done': hasDone ? 'true' : 'false',
          },
          ['input', inputAttrs],
          [
            'div',
            {
              style: objToStyleString(node.attrs.style),
            },
            0,
          ],
        ];
      },
    };
  }

  commands(): TodoItemCommand<Command> {
    return {};
  }
  plugins(): Plugin[] {
    return [];
  }
}
