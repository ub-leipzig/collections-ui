import React from 'react'

export class RotateRightIcon extends React.Component<any, any> {
  render() {
    return (
      <button
        aria-label='rotate right'
        id='right'
        type='button'
        className='btn-viewer btn-xs'
      >
          <svg className="JUQOtd" viewBox="0 0 1792 1792">
            <path
              style={{stroke: 'black', fill: 'black'}}
              d="M1664 256v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138q-148-137-349-137-104 0-198.5
              40.5t-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5q119 0
              225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5t-327 72.5q-156
              0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q147 0 284.5 55.5t244.5 156.5l130-129q29-31 70-14 39 17 39 59z"
            />
          </svg>
      </button>
    )
  }
}
