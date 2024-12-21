import * as React from "react"
import { SVGProps } from "react"
const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m13.488 16.397 2.701 3.071c1 1.138 1.501 1.707 2.025 1.568.524-.138.703-.887 1.063-2.385l1.992-8.306c.553-2.306.83-3.46.215-4.028-.615-.57-1.68-.146-3.812.7l-9.89 3.927c-1.705.677-2.557 1.015-2.611 1.597a.982.982 0 0 0 0 .179c.052.581.903.923 2.606 1.605.772.31 1.157.464 1.434.76.031.034.061.068.09.104.254.316.363.732.58 1.563l.408 1.556c.211.808.317 1.213.594 1.268.278.055.519-.28 1.002-.951l1.603-2.228Zm0 0-.265-.276c-.301-.314-.452-.471-.452-.666 0-.196.15-.353.452-.667l2.978-3.103"
    />
  </svg>
)
export default TelegramIcon
