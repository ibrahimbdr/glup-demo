

const userInput = document.getElementById('searchItems');
const Submit = document.getElementById('searchButton');
let ItemTitle = document.getElementById('itemTitle');
let ItemDescription = document.getElementById('itemDescription');

let urlPost = 'https://jsonplaceholder.typicode.com/posts/';
Submit.addEventListener('click', ()=>{
if(userInput.value!='')
{
    urlPost = 'https://jsonplaceholder.typicode.com/posts/' + userInput.value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', urlPost)
    xhr.send();


    xhr.onload = ()=>{


        const xhrRes = xhr.response;

        const parsedXhr = JSON.parse(xhrRes);
        console.log(parsedXhr);
        ItemTitle.innerHTML = parsedXhr.title;
        ItemDescription.innerHTML = parsedXhr.body;

    
}
}})


let itemslist = document.getElementById('allProducts');
const item = document.getElementById('SelectedItem');


urlPost = `https://jsonplaceholder.typicode.com/posts/`
const xhr = new XMLHttpRequest();
xhr.open('GET', urlPost)
xhr.send();


xhr.onload = ()=>{


    const xhrRes = xhr.response;

    const parsedXhr = JSON.parse(xhrRes);
    console.log(parsedXhr);
    
    parsedXhr.forEach((element) =>
    {
        let itemNo = document.createElement('option');
        itemNo.innerHTML = element.title;
        itemslist.appendChild(itemNo);
    })


        
    itemslist.addEventListener('change', (event)=>{
        parsedXhr.forEach((element) =>
        {
            if(element.title == event.target.value)
                {
                    item.innerHTML = element.body;
                }
    })})
}


let userItemslist = document.getElementById('allUsers');
const Id = document.getElementById('id');
const Name = document.getElementById('name');
const Phone = document.getElementById('phone');
const Website = document.getElementById('website');
const Email = document.getElementById('email');
const City = document.getElementById('city');
const Lat = document.getElementById('lat');
const Lng = document.getElementById('lng');
const Street = document.getElementById('street');
const Suite = document.getElementById('suite');
const Zip_code = document.getElementById('zip_code');
const Company_name = document.getElementById('company_name');
const Catch_phrase = document.getElementById('catch_phrase');
const Bs = document.getElementById('bs');


urlUser = `https://jsonplaceholder.typicode.com/users`;
const xhttpr = new XMLHttpRequest();
xhttpr.open('GET', urlUser)
xhttpr.send();


xhttpr.onload = ()=>{


    const xhttpRes = xhttpr.response;

    const parsedXhttpr = JSON.parse(xhttpRes);
    console.log(parsedXhttpr);

    parsedXhttpr.forEach((element) =>
    {
        let userNo = document.createElement('option');
        userNo.innerHTML = element.username;
        userItemslist.appendChild(userNo);
    })

    


        
    userItemslist.addEventListener('change', (event)=>{
        parsedXhttpr.forEach((element) =>
        {
            if(element.username == event.target.value)
                {
                    Id.innerHTML = "ID: "+element.id;
                    Name.innerHTML = "Name: "+element.name;
                    Phone.innerHTML = "Phone: "+element.phone;
                    Website.innerHTML = "Website: "+element.website;
                    Email.innerHTML = "Email: "+element.email;
                    City.innerHTML = element.address.city;
                    Lat.innerHTML = element.address.geo.lat;
                    Lng.innerHTML = element.address.geo.lng;
                    Street.innerHTML = element.address.street;
                    Suite.innerHTML = element.address.suite;
                    Zip_code.innerHTML = element.address.zipcode;
                    Company_name.innerHTML = "Name: "+element.company.name;
                    Catch_phrase.innerHTML = "Catch Phrase: "+element.company.catchPhrase;
                    Bs.innerHTML = "BS: "+element.company.bs;

                }
    })})
}