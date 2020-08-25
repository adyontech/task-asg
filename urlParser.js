/*
I wanted to do this clean solution but the below can be easily extended.


export const parseURL = (url) => {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    parser.href = url;
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        // There is some issue due to URL is getting encoded twice hence decoding twice ;)
        searchObject[split[0]] =  decodeURIComponent(decodeURIComponent(split[1]));
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        query: searchObject,
        hash: parser.hash
    };
}


*/


console.clear()
const errObj = {
  error: true,
  message: 'url cannot be parsed :('
}

const parseURL = (url) => {
  let  port, pathname, fragment, userName, password, domainName;
  let searchObject = {};
    
  if(!url){
    errObj.message = "empty string"
    return errObj
  }

  let [protocol, restString] = url.split('://');
  if(protocol.split(':').length > 1 || protocol.split('/').length > 1){
    errObj.message = "incorrect protocol, something is wrong"
    return errObj
  }

  // get the pathName
  restString = restString.split('?');
  let pathnameMain = restString[0];
  let splittedPathName = pathnameMain.split('/')
  let splitPathname = splittedPathName.shift();
  pathname = splittedPathName.join('/');
  

  // userName password.

  let userNamePass = splitPathname.split('@');
  domainName = userNamePass[0];


  if(userNamePass.length > 1 ){
    domainName = userNamePass[1]
    
    let userNamePassString = userNamePass[0].split(':');
    if(userNamePassString.length > 2) {
      userName = userNamePassString[0];
      password = userNamePassString[1];
    }
  } else if(userNamePass.length !== 1) { // greater than 1
    //throw error for not correct url 
    return errObj;
  }

  domainName = domainName.split(":");

  // port
  if(domainName.length > 2 ){
    errObj.message = 'incorrect port'
  }else if(domainName.length === 2){
    port = domainName[1];
  }
  domainName = domainName[0];


  // fragment

  let checkFragment = restString[1].split('#');
  if(checkFragment.length > 1){
    fragment = checkFragment[1];
    checkFragment[1] = checkFragment[0];
  }

  // get the url query params (using obj for easy use)
  
  let allRestQueryString = restString[1].split('&');
  for(let i = 0; i < allRestQueryString.length; i++ ) {
    let split = allRestQueryString[i].split('=');
    // There is some issue due to URL is getting encoded twice hence decoding twice ;)
    searchObject[split[0]] =  decodeURIComponent(decodeURIComponent(split[1]));
}

    return {
        protocol,
        port,
        path:pathname,
        userName,
        password,
        query: searchObject,
        fragment,
        domain:domainName
    };
}
var a = 'foo://test:ash@www.localhost.com:3306/sakila?profileSQL=true#kas'
var k = parseURL(a);
var b = 'asjka:foo:aks:ajksh:';
var l = parseURL(b);

console.log(k);

console.log(l);
