import * as shopping_list_items_controller from "./controllers/shopping_list_items_controller.js";
import * as shopping_lists_controller from "./controllers/shopping_lists_controller.js";
import { configure, serve } from "./deps.js";


configure({
  views: `${Deno.cwd()}/views/`
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const handleRequest = async (request) => {
  const url = new URL(request.url);

  if(url.pathname === "/" && request.method === "GET"){
    return await shopping_lists_controller.mainPage(request);

  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shopping_lists_controller.add_shopping_list(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shopping_lists_controller.view_shopping_lists(request);

  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shopping_lists_controller.deactivateLists(request);

  }  else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await shopping_list_items_controller.view_shopping_list_items(request);

  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await shopping_list_items_controller.markCollectedById(request);

  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await shopping_list_items_controller.add_shopping_list_items(request);
    
  } else {
    return new Response ("NOT FOUND", {status: 404});
  }
  
};

serve(handleRequest, { port: 7777 });
