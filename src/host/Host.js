import axios from "axios";

export const url = "https://edu.fargonaxtb.uz";
// export const id=2
export const httpRequest = (config) => {
  return axios({
    ...config,
  });
};
