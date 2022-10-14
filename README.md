<a href="https://github.com/juliangumenita/simple-effing-diagram"><img alt="simple-effing-diagram" src="https://raw.githubusercontent.com/juliangumenita/simple-effing-diagram/main/src/Demo/Assets/Header.svg"/></a>
<br />
<div align="center"><strong>Simple f*cking diagram for React.</strong></div>
<div align="center">Lightweight, customizable and super fast.</div>
<br />
<div align="center">
<a href="https://gumenita.com/">Website</a>
<span> · </span>
<a href="https://github.com/juliangumenita/simple-effing-diagram">Documentation</a>
<span> · </span>
<a href="https://www.instagram.com/juliangumenita/">Instagram</a>
</div>
<br />
<div align="center">
  <sub>Made by <a href="https://gumenita.com/">Julian Gumenita</a>‍</sub>
</div>
<br />

# Features

# Getting started

```bash
# via yarn
yarn add simple-effing-diagram

# via npm
npm install --save simple-effing-diagram
```

# Usage

```jsx
import { Box } from "simple-effing-primitive-layout";

ReactDOM.render(
  <Diagram
    items={{
      _id: "634971ca11220d3efaae3858",
      name: "Luxury Hotel",
      items: [
        {
          _id: "634971d460a07fa809417821",
          name: "F&B Department",
          items: [
            {
              _id: "634971d82e77cebaa9ec1163",
              name: "Greeters",
            },
            {
              _id: "634971ddccbf37ce8d36a633",
              name: "In Chares",
            },
            {
              _id: "634971e1dc3e2787707dee81",
              name: "Sun Restourant",
              items: [
                { _id: "634971e6a40ed1f38d2edd44", name: "Servers" },
                { _id: "634971ea1f7ccbc0fe98e242", name: "Servers" },
              ],
            },
            {
              _id: "634971eea4c8c677e3aa819e",
              name: "Moon Restourant",
              items: [
                {
                  _id: "634971f2ac7fb68761a84b20",
                  name: "Assistant Servers",
                },
              ],
            },
            {
              _id: "634971f6955d1c8397e94414",
              name: "Bars",
              items: [{ _id: "634971fac7120b12e59dcb1e", name: "Mixologists" }],
            },
          ],
        },
      ],
    }}
  />,
  document.getElementById("root")
);
```
