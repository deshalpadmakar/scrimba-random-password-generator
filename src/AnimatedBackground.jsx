import { createRoot } from "react-dom/client"
import { useState, useEffect } from "react"
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react"

createRoot(document.getElementById("background")).render(<Background />)

function Background() {
	const [settings, setSettings] = useState(getSettings())

	function getSettings() {
		const width = window.innerWidth
		if (width < 700) { // Mobile
            return { cameraZoom: 9.5, positionY: 0.3, positionZ: 0.1 }
        }
		else if (width < 1000) { // Tablet
          return { cameraZoom: 11.8, positionY: -0.1, positionZ: 0 }
        }
        else { // Large screens
            return { cameraZoom: 12.5, positionY: 0, positionZ: -0.1 }
        }

	}

	// Update zoom level when window resizes
	useEffect(() => {
		function handleResize() {
			setSettings(getSettings())
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<>
			<ShaderGradientCanvas style={{ pointerEvents: "none" }}>
				<ShaderGradient
					control="query"
					urlString={`https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.4&cAzimuthAngle=1010&cDistance=1.5&cPolarAngle=140&cameraZoom=${settings.cameraZoom}&color1=%231c398e&color2=%23162456&color3=%23af38ff&destination=onCanvas&embedMode=off&envPreset=city&format=webp&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=${settings.positionY}&positionZ=${settings.positionZ}&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.5&rotationX=0&rotationY=0&rotationZ=140&shader=defaults&type=sphere&uAmplitude=7&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.4&uTime=0&wireframe=false`}
				/>
			</ShaderGradientCanvas>
		</>
	)
}
