import { memo } from 'react'
import { meanBy } from 'lodash'

import Floor from './Floor'
import Line from './Line'
import Text from './Text'

const Building = memo(({ parts, name, params }) => {
  const roofPoints = parts
    .filter((part) => part.tags.type === 'roof')
    .map((part) => part.items)
    .flat()
    .map((item) => item.points)
    .flat()

  const x = meanBy(roofPoints, (point) => point.x)
  const y = meanBy(roofPoints, (point) => point.y)
  const z = meanBy(roofPoints, (point) => point.z) * 1.2 + 4000

  return (
    <group>
      {parts.map((buildingPart) => (
        <group key={buildingPart.tags.type}>
          <Text position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            {name}
          </Text>
          {buildingPart.items.map((polygon, index) => {
            // Handle floor
            if (buildingPart.tags.type === 'floors') {
              return polygon.items.map((floorPolygon, index) => (
                <Floor
                  key={index}
                  points={floorPolygon.points}
                  meta={polygon.tags}
                />
              ))
            }

            // Handle other building parts
            return (
              <Line
                key={index}
                points={polygon.points}
                color="lightgray"
                params={params}
              />
            )
          })}
        </group>
      ))}
    </group>
  )
})

export default Building
