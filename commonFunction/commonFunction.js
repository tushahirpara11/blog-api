exports.Message = function (code = "", status, message, data = "") {
  let obj = {
    code: code,
    status: status,
    message: message,
    data: { data }
  }
  return obj;
}