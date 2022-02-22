const InlineBarChart = ({ value1, value2, onClick }) => {
  const total = parseInt(value1) + parseInt(value2);
  const p1 = !parseInt(value2) ? 100 : (parseInt(value1) / total) * 100;
  const p2 = !parseInt(value1) ? 100 : (parseInt(value2) / total) * 100;

  const inlineBarChartData = [
    {
      key: 0,
      data: [{ value: p1 }, { value: p2 }],
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

    return (
      <g onClick={onClick}>
        {percentages.map((percentage, index) => (
          <g>
            <rect
              fill={index === 0 ? "#25EF39" : "#F00202"}
              x={getXs()[index]}
              y={y}
              width={getWidth(percentage.value)}
              height={45}
            >
              <animate
                attributeName='width'
                from='0'
                to={getWidth(percentage.value)}
                dur='0.5s'
                fill='freeze'
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
      viewBox={`0 0 ${500} ${40}`}
      width={"70%"}
      preserveAspectRatio='slice'
      height={"100%"}
      className='bdr-r-10'
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
