import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shopping_lists_service from "../services/shopping_lists_service.js";
import * as requestUtils from "../utils/requestUtils.js";


const responseDetails = {
    headers: {"Content-Type": "text/html;charset=UTF-8"},
};

const add_shopping_list = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    // console.log(name)
    await shopping_lists_service.create(name);
    return requestUtils.redirectTo("/lists")
}

const view_shopping_lists = async (request) => {
    const data = {
        shopping_lists: await shopping_lists_service.findAllActiveShopping_lists(),
    }
    return new Response(await renderFile("shopping_lists.eta", data), responseDetails)
};

const deactivateLists = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shopping_lists_service.deactivateById(urlParts[2]);
    return requestUtils.redirectTo("/lists")
}

const mainPage = async (request) => {
    const data = {
      title: "Shared shopping lists",
      heading: "Shared shopping lists",
      shoppingLists: await shopping_lists_service.countShoppingLists(),
      shoppingListItems: await shopping_lists_service.countShoppingListsItems()
    };
    return new Response(await renderFile("homePage.eta", data), responseDetails);
  }


export { add_shopping_list, view_shopping_lists, deactivateLists, mainPage};
