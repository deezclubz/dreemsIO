import { FC, SVGAttributes } from 'react'

export const Heart: FC<SVGAttributes<SVGSVGElement>> = () => {
	return (
		<svg
			className="w-6 h-6"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.2232 19.2905L11.2217 19.2892C8.62708 16.9364 6.55406 15.0515 5.11801 13.2946C3.69296 11.5512 3 10.0562 3 8.5C3 5.96348 4.97109 4 7.5 4C8.9377 4 10.3341 4.67446 11.2412 5.73128L12 6.61543L12.7588 5.73128C13.6659 4.67446 15.0623 4 16.5 4C19.0289 4 21 5.96348 21 8.5C21 10.0562 20.307 11.5512 18.882 13.2946C17.4459 15.0515 15.3729 16.9364 12.7783 19.2892L12.7768 19.2905L12 19.9977L11.2232 19.2905Z"
				stroke="currentColor"
				fill=""
				strokeWidth="2"
			/>
		</svg>
	)
}
