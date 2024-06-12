import React from 'react'
import useStyles from './style'
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import moment from 'moment'
import _ from 'lodash'

const CustomDataGrid = (props) => {
  const classes = useStyles()
  const {
    getRowId,
    rows,
    columns,
    pageSize,
    onPageSizeChange,
    rowsPerPageOptions,
    fileName,
    customStyle,
  } = props

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <DataGrid
            getRowId={getRowId}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            rowsPerPageOptions={rowsPerPageOptions}
            getRowHeight={() => 'auto'}
            pagination
            autoHeight={true}
            disableSelectionOnClick
            // rowHeight={70}
            components={{
              Toolbar: DataGridFilters,
            }}
            componentsProps={{
              toolbar: { fileName: fileName, customStyle: customStyle },
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomDataGrid

export const DataGridFilters = (props) => {
  const classes = useStyles()
  const { fileName, customStyle } = props

  return (
    <>
      <Grid
        container
        className={classes.quickFilter}
        style={{ background: customStyle?.filterBackground }}
      >
        <Grid item xs={12} className={classes.filterWrapper}>
          <section className={classes.searchWrapper}>
            <GridToolbarQuickFilter
              debounceMs={500}
              variant="outlined"
              size="small"
              sx={{
                background: customStyle?.searchBackground || '#fff',
                border: 'none',
                borderRadius: 20,
                '& fieldset': { border: 'none' },
              }}
            />
          </section>
          <GridToolbarExport
            csvOptions={{
              fileName: `${fileName ? fileName : 'datasheet'}_${moment().format(
                'DDMMYYYY'
              )}_${moment().format('hhmm')}`,
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}
