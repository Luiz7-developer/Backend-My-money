//habilitando o cors pro frontEnd consumir a api do backend
//compartilhamento de recursos apartir de origins que não e a mesma origin do site
//no caso o backend esta em uma porta e o frotEnd esta em outra
module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-type, Accept"
  );
  next();
};
