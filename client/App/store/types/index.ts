export interface Plant {
  description: string;
  id: string;
  imageId: string;
  lifeCycle: string;
  name: string;
  nutritionFacts: {
    items: { name: string; value: string }[];
    portionInfo: string;
  };
  seedToCrop: string;
  yield: string;
}

export interface Category {
  id: string;
  maxSelection: number;
  minSelection: number;
  name: string;
  plants: Plant[];
}


