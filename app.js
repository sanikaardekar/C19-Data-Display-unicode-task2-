let s1=document.querySelector(".cases");
let s2=document.querySelector(".deaths");
let s3=document.querySelector(".active_cases");
let s4=document.querySelector(".deaths_per_1m_population");

let dsc=document.querySelector(".dsc");
/*function fetching()
{
	fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "bebf96f1b3mshc16a62a42e33fe0p1825f0jsnc95852116a72"
	}
})
.then(response => {
	response.json().then(take=>{
    console.log(take);
	sorting(take);
	country_wise(take);
	chart(take);
});
//.catch(err => {      
//	console.error(err);
//});
})} */
function fetching()
{
  //import axios from "axios";
  const options = {
  method: 'GET',
  url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api',
  headers: {
    'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
    'x-rapidapi-key': 'bebf96f1b3mshc16a62a42e33fe0p1825f0jsnc95852116a72'
  }
};

axios.request(options).then(function (take) {
	console.log(take.data);
  country_wise(take.data);
	chart(take.data);
  sorting(take.data);
  search(take.data);
});
//.catch(function (error) {
//	console.error(error);
//});
}
fetching();
up();
function sorting(take)
{    let attri
    //console.log(s2.classList.contains("deaths"));

s1.addEventListener('click',(e)=>{
      //console.log("clicked");
      
      if(e.target.parentElement.parentElement.classList.contains("dsc"))
      {
         attri="cases";let abc=take.countries_stat.sort(compared); 
         makeMyTable(take);
         e.target.parentElement.parentElement.setAttribute("class","asc");
         e.target.classList.add("fas", "fa-angle-double-up", "text-reset");
         //console.log(e.target.classList);
      }
      else{
        attri="cases";let abc=take.countries_stat.sort(comparea); 
        makeMyTable(take);
        e.target.parentElement.parentElement.setAttribute("class","dsc");
        e.target.classList.remove("fas", "fa-angle-double-up", "text-reset");
        e.target.classList.add("fas", "fa-angle-double-down", "text-reset");
      } });
s2.addEventListener('click',(e)=>{      
      if(e.target.parentElement.parentElement.classList.contains("dsc"))
      {
          attri="deaths";let abc=take.countries_stat.sort(compared); 
          makeMyTable(take);
          e.target.parentElement.parentElement.setAttribute("class","asc");
          e.target.classList.add("fas", "fa-angle-double-up", "text-reset");
      }
      else{
        attri="deaths";let abc=take.countries_stat.sort(comparea); 
        makeMyTable(take);
        e.target.parentElement.parentElement.setAttribute("class","dsc");
        e.target.classList.remove("fas", "fa-angle-double-up", "text-reset");
        e.target.classList.add("fas", "fa-angle-double-down", "text-reset");
      }});
s3.addEventListener('click',(e)=>{
      if(e.target.parentElement.parentElement.classList.contains("dsc"))
      {
          attri="active_cases";let abc=take.countries_stat.sort(compared); 
         makeMyTable(take);
         e.target.parentElement.parentElement.setAttribute("class","asc");
         e.target.classList.add("fas", "fa-angle-double-up", "text-reset");
      }
    else{
      attri="active_cases";let abc=take.countries_stat.sort(comparea); 
        makeMyTable(take);
        e.target.parentElement.parentElement.setAttribute("class","dsc");
        e.target.classList.remove("fas", "fa-angle-double-up", "text-reset");
        e.target.classList.add("fas", "fa-angle-double-down", "text-reset");
    }});
s4.addEventListener('click',(e)=>{
      if(e.target.parentElement.parentElement.classList.contains("dsc"))
      {
          attri="deaths_per_1m_population";let abc=take.countries_stat.sort(compared); 
          makeMyTable(take);
          e.target.parentElement.parentElement.setAttribute("class","asc");
          e.target.classList.add("fas", "fa-angle-double-up", "text-reset");
      }
     else{
      attri="deaths_per_1m_population";let abc=take.countries_stat.sort(comparea); 
      makeMyTable(take);
      e.target.parentElement.parentElement.setAttribute("class","dsc");
      e.target.classList.remove("fas", "fa-angle-double-up", "text-reset");
      e.target.classList.add("fas", "fa-angle-double-down", "text-reset");
     }
  });

	function compared(a,b)
		{   
			let c=parseInt(a[attri].replace(/,/g,""));
			let d=parseInt(b[attri].replace(/,/g,""));
			if(a[attri]==="N/A" || b[attri]==="N/A")
			{   let e="N/A";
				c=parseInt(a[attri].replace(e,"0"));
				d=parseInt(b[attri].replace(e,"0"));
			}
		  if(c<d) {return 1;}
		  if(c>d) {return -1;} 
		  return 0;
		}
  function comparea(a,b)
		{   
			let c=parseInt(a[attri].replace(/,/g,""));
			let d=parseInt(b[attri].replace(/,/g,""));
			if(a[attri]==="N/A" || b[attri]==="N/A")
			{   let e="N/A";
				c=parseInt(a[attri].replace(e,"0"));
				d=parseInt(b[attri].replace(e,"0"));
			}
		  if(c<d) {return -1;}
		  if(c>d) {return 1;} 
		  return 0;
		}
        makeMyTable(take);
}
function makeMyTable(take)
{
	document.querySelector(".tbody").innerHTML= "";
	if(take.countries_stat.length>0)
	{
		let t= "";
		take.countries_stat.forEach((e)=>{
			t +="<tr>";
			t +="<td>"+e.country_name+"</td>";
			t +="<td>"+e.cases+"</td>";
			t +="<td>"+e.deaths+"</td>";
			t +="<td>"+e.active_cases+"</td>";
			t +="<td>"+e.deaths_per_1m_population+"</td></tr>";
		});
		document.querySelector(".tbody").innerHTML= t;
	}
	else{console.log("failed to make your table");}
}
function country_wise(take)
{
  let div1=document.querySelector(".active_cases_amt");
  div1.innerHTML+= take.world_total.active_cases;
  let div2=document.querySelector(".deaths_amt");
  div2.innerHTML+= take.world_total.total_deaths;
  let div3=document.querySelector(".recovered_amt");
  div3.innerHTML+= take.world_total.total_recovered;
  let div4=document.querySelector(".deaths_per_1m_amt");
  div4.innerHTML+= take.world_total.total_cases_per_1m_population;
}
function chart(take)
{ let a1=parseInt(take.world_total.active_cases.replace(/,/g,""));
	let a2=parseInt(take.world_total.total_deaths.replace(/,/g,""));
	let a3=parseInt(take.world_total.total_recovered.replace(/,/g,""));
	let a4=parseInt(take.world_total.total_cases_per_1m_population.replace(/,/g,""));
	
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
	type: 'doughnut',
          data: {
            labels: ["Active Cases","Deaths","Recovered","Cases per 1M"],
            datasets: [{ 
                data: [a1,a2,a3,a4],
                borderColor:[
                  "rgb(252, 186, 3)",
                  "rgb(252, 3, 15)",
                  "rgb(30, 227, 16)",
				  "rgb(16, 107, 227)",
                ],
                backgroundColor: [
                  "rgb(252, 186, 3,0.1)",//yellow
                  "rgb(252, 3, 15,0.1)",//red
                  "rgb(30, 227, 16,0.1)",//green
				  "rgb(16, 107, 227,0.1)",//blue
                ],
                borderWidth:2,
              }]
          },
        option:{
			maintainAspectRatio:false,
		}});
}
function search(take)
{  let search=document.querySelector(".search");
   let searchBtn=document.querySelector(".search-btn");
  searchBtn.addEventListener('click',()=>{
  //console.log(take.countries_stat.length);
  for(var i=0;i<take.countries_stat.length;i++)
    { 
      let f=search.value.toLowerCase();
      let b=take.countries_stat[i].country_name.toLowerCase();
      //console.log(take.countries_stat[i].country_name===f);
      //console.log(take.countries_stat[i].country_name);
      if(b===f)
      {    return yes(take,i,search);
      }
    }
    return no(search); 
  });}
  function yes(take,i,search)
  {
    let delBtn=document.querySelector(".del-btn");
    let countryName=document.querySelector(".card-title1");
    let activeCases=document.querySelector(".l1");
    let dpm=document.querySelector(".l2");
    let seriousCritical=document.querySelector(".l3");
    let totalRec=document.querySelector(".l4");
    if(countryName.innerHTML==='Country:' && activeCases.innerHTML==='Active Cases: '&& dpm.innerHTML==='Deaths per 1M: '&& seriousCritical.innerHTML==='Serious Critical: '&& totalRec.innerHTML==='Total Recovered: ')
    {
         countryName.innerHTML+= take.countries_stat[i].country_name;
         
         activeCases.innerHTML+=take.countries_stat[i].active_cases;
         
         dpm.innerHTML+=take.countries_stat[i].deaths_per_1m_population;
         
         seriousCritical.innerHTML+=take.countries_stat[i].serious_critical;
         
         totalRec.innerHTML+=take.countries_stat[i].total_recovered;
    }
    delBtn.addEventListener('click',()=>{
      countryName.innerHTML='Country:';
      activeCases.innerHTML='Active Cases: ';
      dpm.innerHTML='Deaths per 1M: ';
      seriousCritical.innerHTML='Serious Critical: ';
      totalRec.innerHTML='Total Recovered: '; 
      search.value='';
    });
  }
  function no(search){
    let delBtn=document.querySelector(".del-btn");
    let countryName=document.querySelector(".card-title1");
    if(countryName.innerHTML==='Country:')
    countryName.innerHTML+= `Couldn't find '${search.value}'`;
    delBtn.addEventListener('click',()=>{
    countryName.innerHTML='Country:';
    search.value='';
  });
}
function up()
{
  upBtn=document.querySelector(".up-btn");
  
    window.onscroll = ()=> {scrollFunction()};
    function scrollFunction(){
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        upBtn.style.display = "block";
      } else {
        upBtn.style.display = "none";
      }
    }
  upBtn.addEventListener('click',()=>{
  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

