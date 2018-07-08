import * as React from "react";
import OpenSeaDragon from 'openseadragon'

import axios from 'axios'

let image = null;
let region = null;
let abstractRegion = null;
let coordinates = [];

export interface OSDProps {
  image?:string
  region?:string
  abstractRegion?:string
}

const setAbstractRegion = (imageWidth, imageHeight) => {
  const aspectRatio = imageHeight / imageWidth;
  let x;
  let y;
  let w;
  let h;
  x = abstractRegion[0];
  y = abstractRegion[1];
  w = abstractRegion[2];
  h = abstractRegion[3];
  x = x / 100;
  y = y / 100 * aspectRatio;
  w = w / 100;
  h = h / 100 * aspectRatio;
  coordinates.push(x, y, w, h);
  console.log(x, y, w, h)
};

const setRegion = (imageWidth, imageHeight) => {
  const aspectRatio = imageHeight / imageWidth;
  let x;
  let y;
  let w;
  let h;
  x = region[0];
  y = region[1];
  w = region[2];
  h = region[3];
  x = x / imageWidth;
  y = y / imageHeight * aspectRatio;
  w = w / imageWidth;
  h = h / imageHeight;
  coordinates.push(x, y, w, h)
  console.log(x, y, w, h)
};

const getCoordinates = (image) =>
  axios.get(image + "/info.json").then(function (response) {
    const imageWidth = response.data.width
    const imageHeight = response.data.height
    console.log(imageWidth)
    console.log(imageHeight)
    if (region) {
      setRegion(imageWidth, imageHeight)
    } else if (abstractRegion) {
      setAbstractRegion(imageWidth, imageHeight)
    }
  }).catch(function (error) {
    console.log(error)
  });

export class OSD extends React.Component {
  static defaultConfig() {
    return {
      sequenceMode: false,
      showReferenceStrip: false,
      showNavigator: true,
      id: 'osd-viewer',
      visibilityRatio: 0.5,
      constrainDuringPan: false,
      defaultZoomLevel: 0,
      minZoomLevel: 0,
      maxZoomLevel: 10,
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      homeButton: 'reset',
      fullPageButton: 'full-page',
      previousButton: 'sidebar-previous',
      nextButton: 'sidebar-next',
      tileSources: [image + "/info.json"],
      overlays: [{
        id: 'overlay-rotation-bounding-box',
        x: coordinates[0],
        y: coordinates[1],
        width: coordinates[2],
        height: coordinates[3],
        rotationMode: OpenSeaDragon.OverlayRotationMode.BOUNDING_BOX
      }]
    }
  }

  render() {
    return (
      <div className="openseadragon" id="osd-viewer"/>
    )
  }

  constructor (props:OSDProps) {
    super(props)
    getCoordinates(image).then(() => {
      OpenSeaDragon(OSD.defaultConfig())
    })
  }
}

