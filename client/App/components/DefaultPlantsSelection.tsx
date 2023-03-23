import React from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { Plant } from "../store/types";

import { CategoryComponent } from "./Category";

interface DefaultPlantsSelectionProps {
  title: string;
  defaultSelectedPlantsIds: Array<string>;
  onSelectedPlantsChange: (selectedPlantsIds: Array<string>) => void;
  buttonAction: "+" | "-" | null;
}

const DefaultPlantsSelection: React.FC<DefaultPlantsSelectionProps> = ({
  title,
  defaultSelectedPlantsIds,
  onSelectedPlantsChange,
  buttonAction,
}) => {
  const plants = useSelector((state: RootState) => state.plants.data);
  const filteredPlants = plants.filter((plant: Plant) =>
  
    defaultSelectedPlantsIds.includes(plant.id)
  );
  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <CategoryComponent
          buttonAction={buttonAction}
          name={title}
          plants={filteredPlants}
          displayOccurences={true}
          defaultSelectedPlantsIds={defaultSelectedPlantsIds}
          onSelectedPlantsChange={onSelectedPlantsChange}
        />
      </SafeAreaView>
    </View>
  );
};

export default DefaultPlantsSelection;
