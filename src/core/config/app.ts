export const CONFIG_APP = {
    base_url: import.meta.env.POS_BASE_URL,
    print_url: import.meta.env.POS_PRINT_BASE_URL
    // base_url: "http://localhost:5000"
}

export const API_ENDPOINT = {
    products: `${CONFIG_APP.base_url}/product`,
    category: `${CONFIG_APP.base_url}/category`,
    login: `${CONFIG_APP.base_url}/auth/login`,
    register: `${CONFIG_APP.base_url}/auth/register`,
    transaction: `${CONFIG_APP.base_url}/transaction`,
    print: `${CONFIG_APP.print_url}/transaction/print`,
    income: `${CONFIG_APP.base_url}/income`,
    payment: `${CONFIG_APP.base_url}/transaction/payment`,
}