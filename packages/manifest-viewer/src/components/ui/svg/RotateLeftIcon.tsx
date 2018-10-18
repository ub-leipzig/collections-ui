import * as React from "react"

export class RotateLeftIcon extends React.Component<any, any> {
  render() {
    return (
      <button
        aria-label='rotate left'
        id='left'
        type='button'
        className="btn btn-primary-outline btn-xs"
      >
          <svg className="JUQOtd" viewBox="0 0 1792 1792">
            <path
              style={{stroke: 'black', fill: 'black'}}
              d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2
              23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5
              109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137
              138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101
              244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"
            />
          </svg>
      </button>
    )
  }
}