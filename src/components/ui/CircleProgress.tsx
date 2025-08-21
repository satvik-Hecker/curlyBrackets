"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export function CircularProgress({ progress = 65 }: { progress: number }) {
  return (
    <div style={{ width: 96, height: 96 }}>
      <CircularProgressbar
        value={progress}
        
        strokeWidth={2} 
        styles={buildStyles({
          pathColor: "#14b8a6",
          trailColor: "#1e293b",
          textColor: "white",
          textSize: "16px",
        })}
      />
    </div>
  )
}
