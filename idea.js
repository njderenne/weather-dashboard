console.log("api");

const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {

  if (this.readyState === this.DONE) {
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWY4M2I4OGZmODYzZGU3YWM3YmQ1ZDQzIiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjVmODNiODhmZjg2M2RlZGEwZGJkNWQ0NCIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoiSDgzNjFBeDlkci0xNDA3aGdLQmM3cVNmaXBWemI1bXFQX1Z2LXZNSklOQ0E0U1ZJIiwiaWF0IjoxNjAyNDY3OTk4LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.nbPhUQHKHTC3-E95pWW6o6BZJqAqhpfdUMg95TwPCN4"
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.streamelements.com/kappa/v2/overlays/gbsoccer08");


xhr.setRequestHeader("accept", "application/json");


xhr.send(data);


