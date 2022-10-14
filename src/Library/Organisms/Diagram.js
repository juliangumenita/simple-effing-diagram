import React, { useState, useEffect } from "react";
import { Box, Text } from "simple-effing-primitive-layout";

import Lodash from "lodash";

const Recursive = ({
  name = null,
  items = undefined,
  remove = () => {},
  push = () => {},
  step = 1,
  hover = () => {},
  action,
  index = "",
  press = () => {},
  render = () => null,
}) => {
  if (!items) {
    return null;
  }
  return items.map((item, i) => (
    <Element
      key={item._id}
      {...item}
      item={item}
      remove={remove}
      push={push}
      step={step}
      hover={(_) => hover(_)}
      action={action}
      index={index + ";" + i}
      press={press}
      render={render}
    />
  ));
};

const Element = ({
  _id = null,
  name = null,
  items = undefined,
  item = {},
  remove = () => {},
  push = () => {},
  step = 1,
  hover = () => {},
  press = () => {},
  render = () => null,
  action,
  index = "",
}) => {
  const [approval, _approval] = useState(false);

  return (
    <div
      onMouseEnter={() => hover(_id)}
      onMouseLeave={() => {
        _approval(false);
        hover(false);
      }}
    >
      <Box
        parse="pa:20 br:10 mt:20 p:relative"
        border="2px dashed #DDDDDD"
        color={step % 2 ? "#F7F7F7" : "#FFFFFF"}
      >
        <Box
          press={() => press(_id)}
          parse="p:absolute w:100% h:100% t:0 l:0"
          layer={step + 1}
        />
        {action === _id ? (
          <>
            <Box
              press={() => push(index)}
              parse="d:inline-flex a:center j:center p:absolute w:24 h:24 br:5 c:rgba(0,0,0,0.3) t:10 r:10"
              layer={step + 2}
            >
              <svg
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
                fill="#FFFFFF"
              >
                <path
                  d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z"
                  opacity=".35"
                />
                <path d="M17,11h-4V7c0-0.552-0.448-1-1-1s-1,0.448-1,1v4H7c-0.552,0-1,0.448-1,1s0.448,1,1,1h4v4c0,0.552,0.448,1,1,1s1-0.448,1-1	v-4h4c0.552,0,1-0.448,1-1S17.552,11,17,11z" />
              </svg>
            </Box>
            <Box
              color={approval ? "rgba(252,42,0,0.85)" : "rgba(0,0,0,0.3)"}
              press={() => {
                if (approval) {
                  return remove(index);
                }
                return _approval(true);
              }}
              parse="d:inline-flex a:center j:center p:absolute w:24 h:24 br:5 t:10 r:44"
              layer={step + 2}
            >
              <svg
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
                fill="#FFFFFF"
              >
                <path
                  d="M17,22H7c-1.657,0-3-1.343-3-3V6h16v13C20,20.657,18.657,22,17,22z"
                  opacity=".35"
                />
                <path d="M16,4H8V3c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1V4z" />
                <path d="M19,3C18.399,3,5.601,3,5,3C3.895,3,3,3.895,3,5c0,1.105,0.895,2,2,2c0.601,0,13.399,0,14,0c1.105,0,2-0.895,2-2	C21,3.895,20.105,3,19,3z" />
                <path d="M14.812,18.215l-7.027-7.027c-0.384-0.384-0.384-1.008,0-1.392l0.011-0.011c0.384-0.384,1.008-0.384,1.392,0l7.027,7.027	c0.384,0.384,0.384,1.008,0,1.392l-0.011,0.011C15.82,18.599,15.196,18.599,14.812,18.215z" />
                <path d="M7.785,16.812l7.027-7.027c0.384-0.384,1.008-0.384,1.392,0l0.011,0.011c0.384,0.384,0.384,1.008,0,1.392l-7.027,7.027	c-0.384,0.384-1.008,0.384-1.392,0l-0.011-0.011C7.401,17.82,7.401,17.196,7.785,16.812z" />
              </svg>
            </Box>
          </>
        ) : undefined}
        <Text size={16} line={20} weight={500}>
          {name}
        </Text>
        {render(item)}
        <Recursive
          name={name}
          items={items}
          remove={remove}
          push={push}
          step={step + 1}
          hover={(_) => hover(_)}
          action={action}
          index={index}
          press={press}
          render={render}
        />
      </Box>
    </div>
  );
};

const Diagram = ({ items = [], change = () => {}, press = () => {} }) => {
  const [elements, _elements] = useState(items);
  const [hover, _hover] = useState(false);

  useEffect(() => {
    _elements(items);
  }, [items]);

  useEffect(() => {
    change(elements);
  }, [elements]);

  const remove = (index = "0") => {
    const keys = String(index).split(";");

    const recursive = (array, keys) => {
      const find = (array, level) => {
        console.log({ keys, level });
        const result = [];
        array.forEach((e, i) => {
          if (keys.length - 1 == level && keys[keys.length - 1] == i) {
            return [];
          }
          if (keys[level] != i) {
            return result.push(e);
          }
          if (level + 1 != keys.length && e.items) {
            if (keys[level] === i) {
            } else {
              result.push({ ...e, items: find(e.items, level + 1) });
            }
          }
        });
        return result;
      };
      return find(array, 0);
    };

    const _items = recursive(elements, keys);
    _elements(_items);
  };

  const push = (index = "0") => {
    const keys = String(index).split(";");

    const recursive = (array, keys) => {
      const find = (array, level) => {
        const result = [];
        array.forEach((e, i) => {
          if (keys.length - 1 == level && keys[keys.length - 1] == i) {
            if (e.items) {
              result.push({
                ...e,
                items: [
                  { _id: Date.now(), name: "Unnamed Branch", items: [] },
                  ...e.items,
                ],
              });
            } else {
              result.push({
                ...e,
                items: [{ _id: Date.now(), name: "Unnamed Branch", items: [] }],
              });
            }
            return;
          }
          if (keys[level] != i) {
            return result.push(e);
          }
          if (level + 1 != keys.length && e.items) {
            if (keys[level] === i) {
            } else {
              result.push({ ...e, items: find(e.items, level + 1) });
            }
          }
        });
        return result;
      };
      return find(array, 0);
    };

    const _items = recursive(elements, keys);
    _elements(_items);
  };

  return (
    <Box parse="w:100%">
      {elements.map((item, i) => (
        <Element
          key={item._id}
          {...item}
          item={item}
          remove={remove}
          push={push}
          step={1}
          hover={(hover) => _hover(hover)}
          action={hover}
          index={i}
          press={(_id) => alert(_id)}
          render={(item) => {
            if (item?.items?.length > 0) {
              return;
            }
            return (
              <Box parse="mt:5 o:0.25">
                <Text weight={400} size={12}>
                  (No Items)
                </Text>
              </Box>
            );
          }}
        />
      ))}
      <Box
        parse="pa:20 br:10 mt:20 p:relative d:flex a:center j:center"
        border="2px dashed #DDDDDD"
        press={() =>
          _elements([
            ...elements,
            { _id: Date.now(), name: "Unnamed Branch", items: [] },
          ])
        }
      >
        <Text size={16} line={20} weight={500} color="#909090">
          Add Branch
        </Text>
      </Box>
    </Box>
  );
};

export default Diagram;
