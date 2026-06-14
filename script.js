const routes=[
{from:"Islamabad",to:"Hunza",mode:"bus",provider:"Intercity coach + Gilgit local shuttle",time:"14-18 hrs",fare:6500,safety:"Medium",note:"Scenic northern route. Check weather and landslide alerts before departure."},
{from:"Islamabad",to:"Hunza",mode:"car",provider:"Private car / 4x4 via N-35 Karakoram Highway",time:"11-14 hrs",fare:32000,safety:"Medium",note:"Best for family/group travel; daytime travel recommended."},
{from:"Islamabad",to:"Hunza",mode:"flight",provider:"Flight to Gilgit + local shuttle",time:"3-5 hrs",fare:26000,safety:"High",note:"Fastest route but weather dependent."},
{from:"Islamabad",to:"Hunza",mode:"train",provider:"No direct train",time:"N/A",fare:0,safety:"N/A",note:"Use road/flight because Hunza has no direct train connection.",fallback:true},
{from:"Islamabad",to:"Skardu",mode:"bus",provider:"Coach / tourist bus via northern route",time:"18-24 hrs",fare:8000,safety:"Medium",note:"Long scenic route; check mountain road condition."},
{from:"Islamabad",to:"Skardu",mode:"flight",provider:"Direct domestic flight demo",time:"1.5 hrs",fare:30000,safety:"High",note:"Fastest route; weather may affect flights."},
{from:"Islamabad",to:"Skardu",mode:"car",provider:"Private car / 4x4",time:"16-20 hrs",fare:40000,safety:"Medium",note:"Flexible but tiring; recommended with experienced driver."},
{from:"Islamabad",to:"Skardu",mode:"train",provider:"No direct train",time:"N/A",fare:0,safety:"N/A",note:"Use flight or road transport; no direct railway to Skardu.",fallback:true},
{from:"Lahore",to:"Islamabad",mode:"bus",provider:"Daewoo / Faisal Movers demo",time:"4.5-5 hrs",fare:2500,safety:"High",note:"Reliable motorway route."},
{from:"Lahore",to:"Islamabad",mode:"train",provider:"Pakistan Railways demo",time:"5-6 hrs",fare:1800,safety:"High",note:"Good budget option."},
{from:"Lahore",to:"Islamabad",mode:"car",provider:"Self drive / ride share",time:"4-4.5 hrs",fare:9000,safety:"High",note:"Fast but fuel/toll cost higher."},
{from:"Lahore",to:"Islamabad",mode:"flight",provider:"Domestic airline demo",time:"1 hr",fare:16000,safety:"High",note:"Fast but airport time adds delay."},
{from:"Islamabad",to:"Lahore",mode:"bus",provider:"Daewoo / Faisal Movers demo",time:"4.5-5 hrs",fare:2500,safety:"High",note:"Reliable motorway route."},
{from:"Islamabad",to:"Lahore",mode:"train",provider:"Pakistan Railways demo",time:"5-6 hrs",fare:1800,safety:"High",note:"Good budget option."},
{from:"Lahore",to:"Karachi",mode:"train",provider:"Green Line demo",time:"18-20 hrs",fare:6500,safety:"High",note:"Comfortable overnight option."},
{from:"Lahore",to:"Karachi",mode:"flight",provider:"Domestic airline demo",time:"1.8 hrs",fare:24000,safety:"High",note:"Fastest option."},
{from:"Lahore",to:"Karachi",mode:"bus",provider:"Intercity bus demo",time:"20-24 hrs",fare:7000,safety:"Medium",note:"Budget but tiring."},
{from:"Lahore",to:"Karachi",mode:"car",provider:"Private car",time:"16-18 hrs",fare:42000,safety:"Medium",note:"Good for group only."},
{from:"Islamabad",to:"Murree",mode:"car",provider:"Private car / van",time:"1.5-2 hrs",fare:3500,safety:"Medium",note:"Check snow/fog alerts."},
{from:"Islamabad",to:"Murree",mode:"bus",provider:"Local coach",time:"2-3 hrs",fare:900,safety:"Medium",note:"Cheapest."},
{from:"Islamabad",to:"Murree",mode:"train",provider:"No direct train",time:"N/A",fare:0,safety:"N/A",note:"Use bus/car because Murree has no direct train.",fallback:true}
];

const hotels=[
{city:"Islamabad",name:"Serena Hotel",budget:"premium",price:36000,rating:4.6,area:"Khayaban-e-Suharwardy"},
{city:"Islamabad",name:"Hotel One Blue Area",budget:"mid",price:13000,rating:4.0,area:"Blue Area"},
{city:"Islamabad",name:"Student Guest House Demo",budget:"budget",price:5000,rating:3.7,area:"G-9"},
{city:"Lahore",name:"Pearl Continental Lahore",budget:"premium",price:28000,rating:4.5,area:"Mall Road"},
{city:"Lahore",name:"Hotel One Gulberg",budget:"mid",price:12000,rating:4.1,area:"Gulberg"},
{city:"Lahore",name:"Budget Inn Lahore Demo",budget:"budget",price:5500,rating:3.8,area:"Railway Station"},
{city:"Hunza",name:"Eagle's Nest Hunza Demo",budget:"premium",price:22000,rating:4.5,area:"Duikar Viewpoint"},
{city:"Hunza",name:"Karimabad Guest House Demo",budget:"budget",price:6500,rating:4.0,area:"Karimabad Bazaar"},
{city:"Skardu",name:"Shangrila Resort Skardu Demo",budget:"premium",price:30000,rating:4.6,area:"Lower Kachura Lake"},
{city:"Skardu",name:"Mountain Lodge Skardu Demo",budget:"mid",price:11000,rating:4.1,area:"Skardu City"},
{city:"Karachi",name:"Mövenpick Karachi",budget:"premium",price:27000,rating:4.4,area:"Club Road"},
{city:"Karachi",name:"Hotel Mehran",budget:"mid",price:12000,rating:4.0,area:"Shahrah-e-Faisal"}
];

const alertsEn=["Northern routes may close during snow, rain or landslides.","Motorway fog can affect Lahore-Islamabad travel.","Keep CNIC, cash, water and power bank.","Use daytime travel for Hunza, Skardu and mountain routes."];
const alertsUr=["پہاڑی راستے برف یا لینڈ سلائیڈ سے بند ہو سکتے ہیں۔","لاہور اسلام آباد موٹروے پر دھند سفر متاثر کر سکتی ہے۔","شناختی کارڈ، نقدی، پانی اور پاور بینک ساتھ رکھیں۔","شمالی علاقوں میں دن کے وقت سفر بہتر ہے۔"];

const dict={
ur:{
navRoutes:"راستے",navHotels:"ہوٹل",navPass:"پاس",navMaps:"نقشہ",navPlanner:"پلانر",
tagline:"پاکستان ٹریول سپر ایپ ڈیمو",heroTitle:"راستے، ہوٹل، نقشے اور سفری پاس ایک خوبصورت ایپ میں۔",heroText:"بس، ٹرین، کار اور فلائٹ تلاش کریں، سفری پاس بنائیں، ہوٹل دیکھیں اور گوگل میپس کھولیں۔",startBtn:"تلاش شروع کریں",passBtn:"پاس بنائیں",photoText:"پاکستانی خوبصورتی + ٹرانسپورٹ + حفاظت",
routeFinder:"راستہ تلاش کریں",routeTitle:"سستا اور تیز راستہ تلاش کریں",demoData:"ڈیمو + فال بیک ڈیٹا",searchBtn:"تلاش کریں",
passSmall:"سفری پاس",passTitle:"مسافر سفری پاس بنائیں",offlinePass:"آف لائن ڈیمو پاس",generateBtn:"پاس بنائیں",
hotelSmall:"ہوٹل فائنڈر",hotelTitle:"براہ راست لنکس کے ساتھ ہوٹل",showHotels:"ہوٹل دکھائیں",
mapSmall:"راستہ",mapTitle:"گوگل میپس راستہ اور پری ویو",openDirections:"راستہ کھولیں",previewMap:"نقشہ دیکھیں",openCity:"شہر کا نقشہ",mapHint:"پری ویو منزل دکھاتا ہے، راستہ گوگل میپس میں کھلتا ہے۔",
plannerSmall:"پلانر",plannerTitle:"اے آئی طرز کا ٹرپ پلانر",makePlan:"پلان بنائیں",
alertsSmall:"الرٹس",alertsTitle:"روڈ اور موسم الرٹس",emergencySmall:"ایمرجنسی",emergencyTitle:"فوری مدد"
},
en:{}
};
let lang="en";

function clean(x){return (x||"").trim().toLowerCase()}
function mapsUrl(a,b,m="driving"){return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(a)}&destination=${encodeURIComponent(b)}&travelmode=${m}`}
function hotelUrl(c){return `https://www.google.com/travel/hotels/${encodeURIComponent(c)}`}
function bookingUrl(c){return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(c)}`}

function searchRoutes(){
 const from=document.getElementById("fromCity").value, to=document.getElementById("toCity").value, mode=document.getElementById("mode").value, box=document.getElementById("routeResults");
 if(!from||!to){box.innerHTML=`<div class="card"><h3>Enter both cities.</h3></div>`;return}
 let found=routes.filter(r=>clean(r.from)===clean(from)&&clean(r.to)===clean(to)&&(mode==="all"||r.mode===mode));
 if(found.length===0 && mode!=="all"){
   found=[{from,to,mode,provider:`${mode} fallback suggestion`,time:"Check live map",fare:"Estimated",safety:"Check",note:`No exact ${mode} demo route, but you can still open Google Maps or use mixed transport.`,fallback:true}];
 }
 if(found.length===0){box.innerHTML=`<div class="card"><h3>No exact demo route found</h3><p>Use Google Maps route below.</p><div class="actions"><a class="map" target="_blank" href="${mapsUrl(from,to)}">Open Google Maps</a></div></div>`;return}
 found.sort((a,b)=>(a.fare||999999)-(b.fare||999999));
 box.innerHTML=found.map((r,i)=>`
 <div class="card">
   <div class="top"><h3>${r.from} → ${r.to}</h3><span class="mode">${r.mode}</span></div>
   <p>${r.provider}</p>
   <div class="price">${typeof r.fare==="number" ? "Rs "+r.fare : r.fare}</div>
   <div class="meta"><div><b>Time</b><br>${r.time}</div><div><b>Safety</b><br>${r.safety}</div><div><b>Rank</b><br>${i===0&&!r.fallback?"Best":"Option"}</div></div>
   <p>${r.note}</p>
   <div class="actions">
    <button class="green" onclick='book(${JSON.stringify(JSON.stringify(r))})'>Book Demo</button>
    <button onclick="fillPass('${r.from} → ${r.to}')">Generate Pass</button>
    <a class="map" target="_blank" href="${mapsUrl(r.from,r.to)}">Google Directions</a>
    <button onclick="hotelsFor('${r.to}')">Hotels</button>
   </div>
 </div>`).join("");
 document.getElementById("mapFrom").value=from;document.getElementById("mapTo").value=to;document.getElementById("hotelCity").value=to;updateMap(to);
}
function quickRoute(a,b){fromCity.value=a;toCity.value=b;mode.value="all";searchRoutes()}

function searchHotels(){
 const city=hotelCity.value,b=hotelBudget.value,box=hotelResults;
 let found=hotels.filter(h=>clean(h.city)===clean(city)&&(b==="all"||h.budget===b));
 if(!city){box.innerHTML=`<div class="card"><h3>Enter city.</h3></div>`;return}
 if(!found.length){box.innerHTML=`<div class="card"><h3>No demo hotels found</h3><div class="actions"><a target="_blank" href="${hotelUrl(city)}">Google Hotels</a><a target="_blank" href="${bookingUrl(city)}">Booking.com</a></div></div>`;return}
 found.sort((a,b)=>a.price-b.price);
 box.innerHTML=found.map(h=>`<div class="card"><div class="top"><h3>${h.name}</h3><span class="mode">${h.budget}</span></div><p>${h.area}, ${h.city}</p><div class="price">Rs ${h.price}/night</div><div class="meta"><div><b>Rating</b><br>${h.rating} ⭐</div><div><b>Budget</b><br>${h.budget}</div><div><b>City</b><br>${h.city}</div></div><div class="actions"><a target="_blank" href="${hotelUrl(h.city)}">Google Hotels</a><a target="_blank" href="${bookingUrl(h.city)}">Booking.com</a><a class="map" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name+' '+h.city)}">Map</a></div></div>`).join("");
 updateMap(city);
}
function hotelsFor(c){location.hash="#hotels";hotelCity.value=c;hotelBudget.value="all";searchHotels()}

function generatePass(){
 const n=passName.value||"Guest Passenger", id=passCNIC.value||"N/A", route=passRoute.value||`${fromCity.value||"From"} → ${toCity.value||"To"}`, type=passType.value, code="SSF-"+Math.floor(100000+Math.random()*900000);
 passOutput.innerHTML=`<div class="pass-card"><div><h2>SmartSafar Travel Pass</h2><p><b>Name:</b> ${n}</p><p><b>ID:</b> ${id}</p><p><b>Route:</b> ${route}</p><p><b>Type:</b> ${type}</p><p><b>Pass Code:</b> ${code}</p><button onclick="window.print()">Print / Save PDF</button></div><div class="qr"></div></div>`;
}
function fillPass(route){location.hash="#passes";passRoute.value=route;generatePass()}

function updateMap(place){mapFrame.src=`https://maps.google.com/maps?q=${encodeURIComponent(place||"Pakistan")}&z=11&output=embed`}
function previewMap(){updateMap(mapTo.value||toCity.value||"Pakistan")}
function openDirections(){if(!mapFrom.value||!mapTo.value){alert("Enter From and To first");return} window.open(mapsUrl(mapFrom.value,mapTo.value,mapMode.value),"_blank")}
function openCityMap(){window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapTo.value||hotelCity.value||"Pakistan")}`,"_blank")}

function makePlan(){let b=+budget.value,d=+days.value,t=tripType.value;if(!b||!d){planResult.innerHTML="Enter budget and days.";return}planResult.innerHTML=`Suggested ${t} plan: daily budget Rs ${Math.round(b/d)}. Compare route, book hotel, generate pass, then open Google Maps before travel.`}
function showHelp(x){helpBox.innerText=x}
function book(s){let r=JSON.parse(s);modalBody.innerHTML=`<p><b>${r.from} → ${r.to}</b></p><p>${r.provider}</p><p>Fare: ${typeof r.fare==="number"?"Rs "+r.fare:r.fare}</p>`;modal.classList.remove("hidden")}
function closeModal(){modal.classList.add("hidden")}

function toggleLanguage(){
 lang=lang==="en"?"ur":"en"; document.body.classList.toggle("urdu",lang==="ur");
 document.querySelectorAll("[data-i18n]").forEach(el=>{let k=el.dataset.i18n;if(lang==="ur"&&dict.ur[k]){el.dataset.en=el.innerText;el.innerText=dict.ur[k]}else if(lang==="en"&&el.dataset.en){el.innerText=el.dataset.en}});
 alerts.innerHTML=(lang==="ur"?alertsUr:alertsEn).map(a=>`<li>${a}</li>`).join("");
}

function init(){alerts.innerHTML=alertsEn.map(a=>`<li>${a}</li>`).join("");quickRoute("Islamabad","Hunza");hotelCity.value="Hunza";searchHotels();mapFrom.value="Islamabad";mapTo.value="Hunza"}
init();
