import _ from "lodash";

const useLodash = () => {
  console.log(_.join([56, 78]));
  return _.join([56, 78]);
};

export default {
  useLodash,
};
