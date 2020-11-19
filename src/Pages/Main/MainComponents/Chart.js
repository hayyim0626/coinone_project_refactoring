import React, { useState, useEffect } from "react";
import MainChart from "./ChartComponent/MainChart";
import ChartNav from "./ChartComponent/ChartNav";

const Chart = () => {
  const SORT_MAPPER = {
    0: "#거래량많은",
    1: "#급등하는",
    2: "#급락하는",
    3: "#최근상장",
  };

  const [chartList, setChartList] = useState([]);
  const [navColor, setNavColor] = useState(SORT_MAPPER[0]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    const chartList = [];
    for (let i = 1; i <= 19; i++) {
      await fetch(`/data/Main/stockMockData_${i}.json`)
        .then((res) => res.json())
        .then((res) => {
          const data = res.data;
          chartList[i - 1] = {
            data: data,
            coinName: data[data.length - 1].Name,
            present: data[data.length - 1].closing_price.toLocaleString(),
            upDown:
              ((data[data.length - 100].closing_price -
                data[data.length - 190].closing_price) /
                data[100].closing_price) *
              100,
            volume: data[data.length - 1].volume,
            id: data[0].product_id,
          };
        });
    }
    setChartList(chartList.sort((large, small) => small.volume - large.volume));
  };

  const clickBtn = (e) => {
    setNavColor(e.target.id);
    changeList(e.target.id);
  };

  const changeList = (id) => {
    if (id === SORT_MAPPER[0]) {
      setChartList(
        [...chartList].sort((high, low) => high.volume - low.volume)
      );
    }

    if (id === SORT_MAPPER[1]) {
      setChartList(
        [...chartList].sort((high, low) => low.upDown - high.upDown)
      );
    }
    if (id === SORT_MAPPER[2]) {
      setChartList([...chartList].sort((a, b) => a.upDown - b.upDown));
    }
    if (id === SORT_MAPPER[3]) {
      setChartList(
        [...chartList].sort(function (a, b) {
          if (a.coinName > b.coinName) return 1;
          if (a.coinName < b.coinName) return -1;
          return 0;
        })
      );
    }
  };

  return (
    <>
      <ChartNav
        navColor={navColor}
        clickBtn={clickBtn}
        sortMapper={SORT_MAPPER}
      />
      <MainChart chartList={chartList} />
    </>
  );
};

export default Chart;
