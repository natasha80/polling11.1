/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

function getDate(dateMsg) {
  let date = new Date(dateMsg);
  date = date.toLocaleString('ru');
  date = date.substr(0, 17).replace(',', '');
  return date;
}

function getDescription(string) {
  if (string.length > 15) {
    return `${string.slice(0, 15)}...`;
  }
  return string;
}

export default class Polling {
  constructor(elem) {
    if (typeof elem === 'string') {
      // eslint-disable-next-line no-param-reassign
      elem = document.querySelector(elem);
    }
    this.element = elem;
    this.msgList = this.element.querySelector('.polling__wrapper');
    // this.url = 'http://localhost:7070/messages/unread';
    this.url = 'https://ahj-rxjs.herokuapp.com/messages/unread';
  }

  init() {
    this.getMail();
    this.lastId = 0;
  }

  getMail() {
    interval(4000).pipe(
      mergeMap(() => ajax.getJSON(`${this.url}?id=${this.lastId}`)),
    )
      .subscribe((messages) => {
        this.render(messages);
      });
  }

  render(messages) {
    messages.forEach((element) => {
      const date = getDate(element.received);
      const subject = getDescription(element.subject);
      const message = document.createElement('div');
      message.classList.add('polling__messages-message');
      message.innerHTML = `
       <div class="message-email">${element.from}</div>
       <div class="message-subject">${subject}</div>
       <div class="message-date">${date}</div>
       `;
      this.lastId = element.id;
      this.msgList.insertBefore(message, this.msgList.firstElementChild);
    });
  }
}