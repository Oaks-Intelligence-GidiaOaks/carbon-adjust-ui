import { RootState } from "@/app/store";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useId, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const EpcData = [{ symbol: "C", range: "69-80", color: "#85d842", value: 100 }];
const colors = {
  A: "#306f1d",
  B: "#53b645",
  C: "#85d842",
  D: "#f7f752",
  E: "#ecaf3d",
  F: "#e7792e",
  G: "#e23122",
};

const EpcRatingChart = (data: {
  chart: [
    { epc: string; percentage: string },
    { epc: string; percentage: string },
    { epc: string; percentage: string },
    { epc: string; percentage: string },
    { epc: string; percentage: string },
    { epc: string; percentage: string },
    { epc: string; percentage: string }
  ];
}) => {
  const epcData: {
    [key: string | "A" | "B" | "C" | "D" | "E" | "F" | "G"]: number;
  } = {};

  data.chart.forEach(
    (v: { epc: string; percentage: string }) =>
      (epcData[v.epc] = Math.round(+v.percentage.slice(0, -1)))
  );

  console.log(epcData);

  const EpcRatings = useMemo(() => {
    return [
      { symbol: "A", range: "92+", color: "#306f1d", value: epcData.A },
      {
        symbol: "B",
        range: "81-91",
        color: "#53b645",
        value: epcData.B,
      },
      {
        symbol: "C",
        range: "69-80",
        color: "#85d842",
        value: epcData.C,
      },
      {
        symbol: "D",
        range: "55-68",
        color: "#f7f752",
        value: epcData.D,
      },
      {
        symbol: "E",
        range: "39-54",
        color: "#ecaf3d",
        value: epcData.E,
      },
      {
        symbol: "F",
        range: "21-38",
        color: "#e7792e",
        value: epcData.F,
      },
      { symbol: "G", range: "1-20", color: "#e23122", value: epcData.G },
    ];
  }, []);

  const userData = useSelector((state: RootState) => state.user.user);

  const id = useId();
  const width = 240;
  const half = width / 2;

  const [activeArc, setActiveArc] = useState(null);

  return (
    <div>
      <svg height={width} width={width}>
        <Group top={half} left={half}>
          <Pie
            data={EpcRatings}
            pieValue={(data) => data.value}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size =
                activeArc && (activeArc as any).symbol === data.symbol
                  ? 70
                  : 50;
              return half - size;
            }}
            padAngle={0.02}
            cornerRadius={5}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <>
                    <g
                      key={arc.data.symbol}
                      onMouseEnter={() => setActiveArc(arc.data as any)}
                      onMouseLeave={() => setActiveArc(null)}
                      className="transition-all duration-300 ease-in-out"
                    >
                      {arc.endAngle - arc.startAngle >= 0.2 && (
                        <text
                          fill="#ffffff"
                          x={pie.path.centroid(arc)[0]}
                          y={pie.path.centroid(arc)[1]}
                          dy=".33em"
                          fontSize={24}
                          textAnchor="middle"
                          pointerEvents="none"
                          className="z-10 transition-all duration-300 ease-in-out"
                          style={{ opacity: 1, zIndex: 10 }}
                        >
                          {arc.data.symbol}
                        </text>
                      )}
                      <path
                        d={pie.path(arc) ?? ""}
                        fill={arc.data.color}
                        className="transition-all duration-300 ease-in-out"
                      ></path>
                    </g>
                    <g
                      key={arc.data.symbol + id}
                      onMouseEnter={() => setActiveArc(arc.data as any)}
                      onMouseLeave={() => setActiveArc(null)}
                      className="transition-all duration-300 ease-in-out"
                    >
                      {arc.endAngle - arc.startAngle >= 0.2 && (
                        <text
                          fill="#ffffff"
                          x={pie.path.centroid(arc)[0]}
                          y={pie.path.centroid(arc)[1]}
                          dy=".33em"
                          fontSize={24}
                          textAnchor="middle"
                          pointerEvents="none"
                          className="z-10 transition-all duration-300 ease-in-out"
                          style={{ opacity: 1, fontWeight: 600 }}
                        >
                          {arc.data.symbol}
                        </text>
                      )}
                      <path
                        d={pie.path(arc) ?? ""}
                        fill={arc.data.color}
                        style={{ opacity: 0 }}
                        className="transition-all duration-300 ease-in-out"
                      ></path>
                    </g>
                  </>
                );
              });
            }}
          </Pie>
          <Pie
            data={EpcData}
            pieValue={(data) => data.value}
            outerRadius={half - 70}
            innerRadius={0}
            padAngle={0.02}
            cornerRadius={5}
            className="transition-all duration-300 ease-in-out"
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.range + id}
                    onMouseEnter={() => setActiveArc(arc.data as any)}
                    onMouseLeave={() => setActiveArc(null)}
                    className="drop-shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <path
                      d={pie.path(arc) ?? ""}
                      fill={"#ffffff"}
                      className="transition-all duration-300 ease-in-out"
                    ></path>
                    <Text
                      textAnchor="middle"
                      verticalAnchor="middle"
                      fill={
                        activeArc
                          ? ((activeArc as any).color as any)
                          : (EpcRatings as any).color
                      }
                      style={{ fontSize: 34, fontWeight: 600 }}
                      className="transition-all duration-300 ease-in-out"
                    >
                      {activeArc
                        ? `${Math.round(
                            ((activeArc as any).value /
                              Object.values(epcData).reduce(
                                (prev, curr) => prev + curr,
                                0
                              )) *
                              100
                          )}%`
                        : userData?.epcRating}
                    </Text>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
        <Group top={half} left={half}>
          <Pie
            data={EpcData}
            pieValue={(data) => data.value}
            outerRadius={half - 70}
            innerRadius={0}
            padAngle={0.02}
            cornerRadius={5}
            className="transition-all duration-300 ease-in-out"
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.range + id}
                    // onMouseEnter={() => setActiveArc(arc.data)}
                    // onMouseLeave={() => setActiveArc(null)}
                    className="drop-shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <path
                      d={pie.path(arc) ?? ""}
                      fill={"#ffffff"}
                      className="transition-all duration-300 ease-in-out"
                    ></path>
                    <Text
                      textAnchor="middle"
                      verticalAnchor="middle"
                      fill={
                        activeArc
                          ? (activeArc as any).color
                          : colors[userData?.epcRating as keyof typeof colors]
                      }
                      style={{ fontSize: 34, fontWeight: 600 }}
                      className="transition-all duration-300 ease-in-out"
                    >
                      {activeArc
                        ? `${Math.round(
                            ((activeArc as any).value /
                              Object.values(epcData).reduce(
                                (prev, curr) => prev + curr,
                                0
                              )) *
                              100
                          )}%`
                        : userData?.epcRating}
                    </Text>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
    </div>
  );
};

export default EpcRatingChart;
