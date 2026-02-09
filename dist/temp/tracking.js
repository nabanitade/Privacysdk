const analytics = require("./analytics");
if (!analytics.consent) {
  fetch("https://api.thirdparty.com/track", { method: "POST", body: analytics.userEmail });
}
