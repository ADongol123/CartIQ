export const setCookie = async ({
    name,
    value,
    days = 7,
    secure = true,
}: {
    name: string;
    value: string;
    days?: number;
    secure?: boolean;
}) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;secure=" + secure;
};

export const getCookie = (name: string) => {
    /* not in the browser? → bail out */
    if (typeof document === "undefined") return null;

    const value = "; " + document.cookie
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift();
};
export const removeCookie = (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
