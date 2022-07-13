let url = "http://ip-api.com/json/?lang=en-US"

$httpClient.get(url, function(error, response, data){
    let jsonData = JSON.parse(data)
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.countryCode)
    let city = jsonData.city
    let isp = jsonData.isp
    let ip = jsonData.query
  body = {
    title: "𝗣𝗿𝗼𝘅𝘆 𝗜𝗻𝗳𝗼",
    content: `𝗜𝗣：${ip}\n𝗜𝗦𝗣：${isp}\n𝗟𝗢𝗖：${emoji}${country} - ${city}`,
    icon: "map.circle",
    "icon-color": "#CA5C6E"
  }
  $done(body);
});


function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);


}
