const InlineBarChart = () => {
  const inlineBarChartData = [
    {
      key: 0,
      data: [{ value: 60 }, { value: 40 }],
    },
  ];
  const BarHeight = 20;
  const BarGap = 50;

  const Bar = ({ y, data: percentages }) => {
    const getXs = () => {
      let x = 0;
      const xs = percentages.map((percentage) => {
        x = x + 500 * (percentage.value / 100);
        return x;
      });

      return [0, ...xs];
    };

    const getWidth = (percentage) => {
      return 500 * (percentage / 100);
    };

    const getRandomColor = () => {
      return (
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    };

    return (
      <g>
        {percentages.map((percentage, index) => (
          <g>
            <rect
              fill={getRandomColor()}
              x={getXs()[index]}
              y={y}
              width={getWidth(percentage.value)}
              height={30}
            >
              <animate
                attributeName="width"
                from="0"
                to={getWidth(percentage.value)}
                dur="0.5s"
                fill="freeze"
              />
              <title>{percentage.value}</title>
            </rect>
          </g>
        ))}
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${500} ${25}`}
      width={"100%"}
      preserveAspectRatio='slice'
      height={'100%'}
    >
      {inlineBarChartData.map((datum, index) => (
        <Bar
          key={datum.key}
          y={index * (BarHeight + BarGap)}
          data={datum.data}
        />
      ))}
    </svg>
  );
};

export default InlineBarChart;
