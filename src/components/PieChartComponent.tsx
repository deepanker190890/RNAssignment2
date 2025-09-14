// src/components/PieChartComponent.tsx
import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type PieChartData = {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

const screenWidth = Dimensions.get('window').width;

const PieChartComponent = ({ data }: { data: PieChartData[] }) => {
  return (
    <PieChart
      data={data}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="amount"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  );
};

export default PieChartComponent;
