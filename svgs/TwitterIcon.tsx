import * as React from "react"
import { SVGProps } from "react"
const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={28}
    fill="none"
    {...props}
  >
    <rect width={27} height={27} y={0.057} fill="#00594C" rx={13.5} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m6 21.057 6.29-6.29m0 0L6 6.056h4.167l4.543 6.29m-2.42 2.42 4.543 6.29H21l-6.29-8.71M21 6.057l-6.29 6.29"
    />
  </svg>
)
export default TwitterIcon
