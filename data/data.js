import { parse } from '@std/csv/parse';

const d = await fetch(Deno.env.get('DATA_FILE'));
const text = await d.text();

const data = parse(text, { skipFirstRow: false }).filter(
  (i) => i[0] != '' && i[1] != ''
);

export function getByPassport(passportId) {
  return data.find((i) => i[4] == passportId);
}

function composePassword(dob) {
  return dob.trim().replaceAll('/', '');
}

export function login(passportId, password) {
  const user = data.find((i) => i[4] === passportId);
  if (user) {
    if (password === composePassword(user[5])) {
      return user[4].trim();
    } else {
      throw new Error('LOGIN: password mismatch');
    }
  } else {
    throw new Error('LOGIN: no user specified');
  }
}
