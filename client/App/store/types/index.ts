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

export interface User {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export interface Fields {
  "first name": string;
  "last name": string;
  email: string;
  password: string;
  "password confirmation": string;
}
