import React from "react";

// eslint-disable-next-line import/prefer-default-export
export function matrixLog(text) {
  console.log(
    `%c ///////////////-- ${text} --///////////////`,
    `background: #000; color: #00ff00`
  );
}

export function errorLogger(err) {
  console.log(err);
  if (err.response) {
    console.log("Client received an error, code (5xx or 4xx)", err);
  } else if (err.request) {
    console.log("Client never received a response, or request never left", err);
  } else {
    console.log("App contains an error. Execution never reached axios", err);
  }
}

export function getCookie(name) {
  const match = document.cookie.match(RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

// en desuso
// export function deleteCookie(name) {
//   document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
// }

export function dateFormatter(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  const postDate = `${year}/${month}/${day}  ${hours}:${minutes}`;
  return postDate;
}
