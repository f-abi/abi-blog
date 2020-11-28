export function setCookie(key, val, day) {
  let exp = new Date();
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + escape(val) + ";expires=" + exp.toGMTString();
}
export function getCookie(key) {
  let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
export function delCookie(key) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(key);
  if (cval != null)
    document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
}
export function isCookie(key) {
  if (document.cookie.indexOf(key) === -1) {
    return false;
  }
  return true;
}
