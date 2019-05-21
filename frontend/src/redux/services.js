import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "./constants";
const Configuration = {
  API_URL: "http://127.0.0.1:8000/"
};

class XmlHttpRequestService {
  fetch(config) {
    return new Promise((resolve, reject) => {
      const url = Configuration.API_URL + config.path;

      const xhreq = new XMLHttpRequest();
      xhreq.onload = e => {
        let res;
        if (
          xhreq.status === 200 ||
          xhreq.status === 201 ||
          xhreq.status === 204
        ) {
          res = this.getResponse(xhreq.response, {
            detail: "Status is ok but no response!"
          });
          resolve(res);
        } else {
          res = this.getResponse(xhreq.response, { detail: "No Response" });
          reject({
            detail: res
          });
        }
      };
      const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
      xhreq.open(config.method, url, true);
      if (config.sendToken)
        xhreq.setRequestHeader("Authorization", "JWT " + token);
      if (config.body) {
        const { body } = config;
        if (body instanceof FormData) {
          xhreq.send(body);
        } else {
          xhreq.setRequestHeader(
            "Content-Type",
            config.contentType || "application/json"
          );
          xhreq.send(JSON.stringify(body));
        }
      } else xhreq.send();
    });
  }

  getResponse(response, noResponse) {
    let res;
    if (response) {
      try {
        res = JSON.parse(response);
      } catch (error) {
        res = { detail: response };
      }
    } else res = noResponse;

    return res;
  }
}

export default new XmlHttpRequestService();
