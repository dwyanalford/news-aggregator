// app/utils/sortByName.ts

// Used to alphabetically sort the data files (files in the data folder of this project) by "name" key.
export const sortByName = <T extends { name: string }>(data: T[]): T[] => {
    return data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };
  