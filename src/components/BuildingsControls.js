import { memo, useRef } from 'react'
import styled from '@emotion/styled'
import Draggable from 'react-draggable'
import { Box, Card, Slider, TextField } from '@mui/material'
import { TreeItem, LoadingButton, TreeView } from '@mui/lab'

import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useBuildings } from '../store'

const Controls = styled(Card)`
  width: 220px;
  max-height: 95vh;
  overflow-y: auto;

  .MuiTreeItem-root:last-child {
    padding-bottom: 10px;
  }
`
const DragIndicator = styled.div`
  border: 1px solid grey;
  cursor: pointer;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`

const BuildingsControls = memo(() => {
  const nodeRef = useRef(null)
  const { data: buildingData, fetchData, params, isLoading } = useBuildings()

  const onSubmit = (event, index) => {
    event.preventDefault()
    const height = parseInt(event.target.height.value, 10)
    const width = parseInt(event.target.width.value, 10)
    const roofAngle = parseInt(event.target.roofAngle.value, 10)

    const newParams = params.slice()
    newParams[index] = { height, width, roofAngle }

    fetchData(newParams)
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: window.innerWidth - 240, y: 16 }}
      handle=".handle"
    >
      <Controls ref={nodeRef}>
        <Box display="flex" alignItems="center">
          <DragIndicator className="handle">
            <DragIndicatorIcon />
          </DragIndicator>
          Buildings Controls
        </Box>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {buildingData?.map(({ tags, params }, index) => (
            <TreeItem
              key={tags.name}
              nodeId={tags.name}
              label={`Building ${tags.name}`}
            >
              <form onSubmit={(e) => onSubmit(e, index)}>
                <Box px={2} py={1}>
                  <Box fontSize={14} mb={2}>
                    Area: {tags.area}
                  </Box>
                  <Box my={2}>
                    <TextField
                      label="height"
                      name="height"
                      size="small"
                      variant="outlined"
                      defaultValue={params.height}
                    ></TextField>
                  </Box>
                  <Box my={2}>
                    <TextField
                      label="width"
                      name="width"
                      size="small"
                      variant="outlined"
                      defaultValue={params.width}
                    ></TextField>
                  </Box>
                  <Box my={2} display="flex" alignItems="center">
                    <Box width={150} fontSize={14}>
                      Roof Angle:
                    </Box>
                    <Slider
                      size="small"
                      name="roofAngle"
                      valueLabelDisplay="on"
                      min={0}
                      max={90}
                      step={1}
                      defaultValue={params.roofAngle}
                    />
                  </Box>
                  <LoadingButton
                    color="primary"
                    variant="outlined"
                    size="small"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </form>
            </TreeItem>
          ))}
        </TreeView>
      </Controls>
    </Draggable>
  )
})

export default BuildingsControls
