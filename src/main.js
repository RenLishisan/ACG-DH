const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "${node.url}/favicon.ico",
    logoType: "image",
    url: "https://www.baidu.com",
  },
  {
    logo: "src/img/bilibili.png",
    logoType: "image",
    url: "https://bilibili.com",
  },
  {
    logo: "${node.url}/favicon.ico",
    logoType: "image",
    url: "http://llss.top",
  },
  {
    logo: "${node.url}/favicon.ico",
    logoType: "image",
    url: "https://bcy.net",
  },
  {
    logo: "${node.url}/favicon.ico",
    logoType: "image",
    url: "https://www.linovel.net",
  },
  {
    logo: "${node.url}/favicon.ico",
    logoType: "image",
    url: "https://www.jijidown.com",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">
            <img src="${node.url}/favicon.ico" alt="" /></div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class ="close">
            <svg class="icon">
                 <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
   </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入你想要收藏的网站嗷！");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: url[0],
    logoType: "text",
    url: url,
  });
  render();
});

// window.onbeforeunload = () => {
//   const string = JSON.stringify(hashMap);
//   localStorage.setItem("x", string);
// };
