const container = document.getElementById('root')

const Didact = {
  createElement,
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
console.log('element',element)
console.log('a',result)
const elStr = JSON.stringify(element)
const resultStr = JSON.stringify(result)
console.log(elStr === resultStr)
console.log('element',elStr)
console.log('------')
console.log('result', resultStr)
