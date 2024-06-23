export const CONFIG_APP = {
    base_url: "http://localhost:5000"
    // base_url: "https://c536-2001-448a-2040-89a9-7461-dc3a-9763-247f.ngrok-free.app"
}

export const API_ENDPOINT = {
    products: `${CONFIG_APP.base_url}/product`,
    category: `${CONFIG_APP.base_url}/category`,
    login: `${CONFIG_APP.base_url}/auth/login`,
    register: `${CONFIG_APP.base_url}/auth/register`,
    transaction: `${CONFIG_APP.base_url}/transaction`
}