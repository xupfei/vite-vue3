const modules = import.meta.globEager("./*/*.js");

const api = {};
Object.keys(modules).forEach((i) => {
    const arr = i.split("/");
    const key = arr[1];
    const name = arr[2].split(".")[0];
    if (api[key] instanceof Object) {
        api[key][name] = modules[i].default;
    } else {
        api[key] = {};
        api[key][name] = modules[i].default;
    }
});
// console.log(api);
export default api;