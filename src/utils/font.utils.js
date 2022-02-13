import * as THREE from 'three'

let font

export async function loadFont() {
  if (!font) {
    return new Promise((resolve) => {
      new THREE.FontLoader().load('/OpenSans_Regular.json', resolve)
    }).then((loadedFont) => {
      font = loadedFont

      return font
    })
  } else {
    return font
  }
}
