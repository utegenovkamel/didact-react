const Didact = {
  createElement,
  render,
}

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ?
    document.createTextNode('') :
    document.createElement(element.type);

  Object.keys(element.props)
    .filter(property => property !== 'children')
    .forEach(property => dom[property] = element.props[property])

  for (const child of element.props.children) {
    render(child, dom)
  }

  container.appendChild(dom)
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)
// result of createElement()
const result = {
  type: 'div',
  props: {
    id: 'foo',
    children: [
      {
        type: 'a',
        props: {
          children: [
            {
              type: 'TEXT_ELEMENT',
              props: {
                nodeValue: 'bar',
                children: [],
              }
            },
          ]
        }
      },
      {
        type: 'b',
        props: {
          children: []
        }
      }
    ]
  }
}

const container = document.getElementById("root")
Didact.render(element, container)

