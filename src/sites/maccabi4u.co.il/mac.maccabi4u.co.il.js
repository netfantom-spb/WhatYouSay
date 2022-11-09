import {waitForContainer, updateInnerText} from '../../common.js';

console.log('Hi Maccabi!')

updateInnerText(['.login > h2', '.login li:nth-child(1) > a', '.login li:nth-child(2) > a'], ['Вход в личный кабинет', 'Пароль', 'Одноразовый код']);

updateInnerText(['#IdentifyWithOTP .myID label', '.enterPersonalDetails .birthDate + label'], ['Теудат Зеут', 'Дата рождения (от 16)']);
updateInnerText(['#IdentifyWithOTP button.submit'], ['Войти']);


updateInnerText(['#IdentifyWithPassword #identifyWithPasswordCitizenId + label', '#IdentifyWithPassword #password + label'], ['Теудат Зеут', 'Пароль']);
updateInnerText(['#IdentifyWithPassword button.validatePassword'], ['Войти']);

updateInnerText(['.joinOnline'], ['У меня нет пароля'])
updateInnerText(['.forgetPassword'], ['У меня нет пароля'])
