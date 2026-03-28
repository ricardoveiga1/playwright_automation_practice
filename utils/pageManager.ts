import { Page } from "playwright/test";
import { PageActions } from "../Pages/PageActions";
import { AutomationPractice } from "../Pages/automationPractice";
import { AutomationPracticeAPI } from "../API/automationPracticeAPI";


export class PageManager{
    page: Page
    constructor(page: Page) {
        this.page = page;
    }
    
    get pageActions(): PageActions {
        return new PageActions(this.page);
    }
    get automationPractice(): AutomationPractice {
        return new AutomationPractice(this.page, "");
    }
    get automationPracticeApi(): AutomationPracticeAPI {
        return new AutomationPracticeAPI(this.page);
    }
}