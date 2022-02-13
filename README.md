# Frontend Assignment

## Solution

For this assignment I've used some additional dependencies to speed up development:

```json
"@emotion/react": "^11.7.1",
"@emotion/styled": "^11.6.0",
"@mui/material": "^5.4.1",
"zustand": "^3.7.0"
"drei": "^0.0.40",
"react-draggable": "^4.4.4",
```

Final gziped build size us 380.79 kB which is pretty big, but good enough since we use threejs and react-three-fiber.
I've used @emotion + mui v5 as simple and fast styling approach, I also chose zustand for state management, since it's part of react-three-fiber ecosystem and very simple to use tool.
Other from that I've used drei for html-in-3D rendering and react-draggable for draggable controls.

## Demo

Demo is available here: [http://finch-assignment.netlify.app/](http://finch-assignment.netlify.app/).

## Overview

An architect wants to change some of the attributes of a building, e.g. height, width and roof angle. In association with this they want to see the meta data of the buildings, e.g. name, height and floor area.

The sample setup is a project that loads building data from a file locally and renders it in a 3D canvas. Some other sample data is also rendered.

### Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 3D Rendering

The 3D rendering is handled with [three.js](https://threejs.org/) and a wrapper library [react-three-fiber](https://github.com/react-spring/react-three-fiber).

### Building Data API

NOTE: This api a prototype we used to evaluate JavaScript performance and data formats. We do not know of any bugs, but they may still exist. :)

To generate new building data, make a POST request to `https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build`.

The payload should be a json array where each item is a dictionary with params corresponding to a building that index. The params for each building can contain `height`, `width` and `roofAngle`. If any parameter is missing or null, then default values is used by the api:
```
{
  "width": 10000,
  "height": 10000,
  "roofAngle": 30
}
```

The following example request will generate buildings where the first building uses the default value, the second is 30000 mm high, and the rest use the default values.
```
curl -X POST -d '[null,{"height":30000}]' https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build
```

The project already contains a local file with pre-generated building data, [buildings.json](./data/buildings.json), which is loaded and rendered at startup in the demo application.

## Assignment

Do your changes in a fork of this repo, and then send a link to that repo when you are done.

### Main Tasks
* Generate building data with params via an endpoint (instead of loading locally).
* Add user controls to edit individual building height, and re-generate new building data.

### Bonus Tasks (if you have the time)
* Add display of building meta data, i.e. `name`, `height` and `area`.
* Add display of floor meta data, i.e. `level` and `area`, in HTML or 3D canvas.
* Add functionality to edit of building `width` and `roofAngle`.
