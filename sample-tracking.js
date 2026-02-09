// Sample code for policy mismatch testing
// This intentionally sends PII to a third-party endpoint.

const user = {
  email: "test.user@example.com",
  consent: false
};

function sendToAnalytics(payload) {
  fetch("https://api.thirdparty.com/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// No consent check here (intentional for demo)
sendToAnalytics({ email: user.email });
