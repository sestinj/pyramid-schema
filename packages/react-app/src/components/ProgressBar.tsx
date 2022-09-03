import { P } from ".";

interface ProgressBarProps {
  backgroundColor?: string;
  fillColor?: string;
  maxValue: number;
  currentValue: number;
  width: number;
  height?: number;
  widthUnit?: string;
}

const ProgressBar = ({
  backgroundColor = "white",
  fillColor = "#00e1ff",
  maxValue,
  currentValue,
  width,
  height = 25,
  widthUnit = "px",
}: ProgressBarProps) => {
  return (
    <>
      <div
        style={{
          borderRadius: "8px",
          backgroundColor,
          border: "2px solid black",
          width: `${width}${widthUnit}`,
          overflow: "clip",
        }}
      >
        {/* Border */}
        <div
          style={{
            backgroundColor: fillColor,
            width: `${Math.min(Math.max(0, currentValue / maxValue), 100) *
              100}%`,
            height: `${height}px`,
            display: "table",
          }}
        >
          <P
            style={{
              textAlign: "center",
              display: "table-cell",
              verticalAlign: "middle",
              color: "black",
            }}
          >
            {Math.max(0, currentValue)}/{maxValue} wei
          </P>
        </div>

        {/* Filler */}
      </div>
    </>
  );
};

export default ProgressBar;
