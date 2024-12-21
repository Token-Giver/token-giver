import * as React from "react"
import { SVGProps } from "react"
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.625 13.625 17 17"
    />
    <path
      stroke="#141B34"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.5 8.75a6.75 6.75 0 1 0-13.5 0 6.75 6.75 0 0 0 13.5 0Z"
    />
  </svg>
)
export default SearchIcon
