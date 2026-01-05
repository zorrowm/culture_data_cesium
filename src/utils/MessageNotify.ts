import { Notify } from 'quasar';

export default class MessgeNotify {
  info(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Notify.create({
      type: 'info',
      message: msgInfo,
      timeout: time,
      position: 'top',
    });
  }
  success(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Notify.create({
      type: 'positive',
      message: msgInfo,
      timeout: time,
      position: 'top',
    });
  }
  warning(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Notify.create({
      type: 'warning',
      message: msgInfo,
      timeout: time,
      position: 'top',
    });
  }
  warn(msgInfo: string, seconds = 3) {
    this.warning(msgInfo, seconds);
  }
  error(msgInfo: string, seconds = 3) {
    const time = seconds <= 0 ? 1000 : seconds * 1000;
    Notify.create({
      type: 'negative',
      message: msgInfo,
      timeout: time,
      position: 'top',
    });
  }
}

const message = new MessgeNotify();
export { message };
