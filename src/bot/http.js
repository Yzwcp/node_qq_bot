const axios = require("axios");
const p = (form) => {
  return new Promise((resolve, rejeck) => {
    axios({
      url: "https://180418df-0c01-4d88-b075-eec3cf0b0ca2.bspapp.com/acc",
      data: form,
      method: "post",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        rejeck(err);
      });
  });
};
function axiosGet(action, d) {
  let body = {
    ex: { action },
    data: d,
  };
  return p(body);
}
axiosGet('queryDay',{commandStr:'used*100'}).then(res=>{
    console.log(res)
  // console.log(res.l)
})

module.exports = {
  axiosGet,
};
